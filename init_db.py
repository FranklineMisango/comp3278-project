"""
init_db.py
==========
Builds the financial_tracker MySQL database from schema.sql and populates it
with the Kaggle-derived data in processed_financial_data/.

Run:  python init_db.py
Re-run to reset the database (it drops and recreates all tables).
"""
import os
from pathlib import Path
from datetime import datetime, timedelta
import pymysql
import pandas as pd

BASE = Path(__file__).resolve().parent
SCHEMA_PATH = BASE / "schema.sql"
DATA_DIR = BASE / "processed_financial_data"

DB_CONFIG = {
    "host": "localhost",
    "user": "finance_app",
    "password": "finance_app_2026",
    "charset": "utf8mb4",
    "autocommit": True,
}
DB_NAME = "financial_tracker"


def get_conn(database=None):
    cfg = dict(DB_CONFIG)
    if database:
        cfg["database"] = database
    conn = pymysql.connect(**cfg)
    conn.cursor(pymysql.cursors.DictCursor)
    return conn


def init_db():
    # ---- 1. Create database if missing ----
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME} "
                    f"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    conn.close()

    # ---- 2. Create schema ----
    conn = get_conn(DB_NAME)
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        sql = f.read()
    # Strip SQL comment lines (--) then split on ';' to avoid breaking on
    # semicolons that appear inside comments.
    clean_lines = []
    for line in sql.splitlines():
        stripped = line.strip()
        if stripped.startswith("--"):
            continue
        clean_lines.append(line)
    clean_sql = "\n".join(clean_lines)
    with conn.cursor() as cur:
        for statement in clean_sql.split(";"):
            statement = statement.strip()
            if statement:
                cur.execute(statement)
    conn.commit()

    # ---- 3. Banks ----
    banks = [
        (1, "Chase Bank"),
        (2, "Bank of America"),
        (3, "Wells Fargo"),
        (4, "Citibank"),
    ]
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO Bank(bankID, bankName) VALUES (%s, %s)", banks
        )

    # ---- 4. Users ----
    users = [
        (1, "alice@example.com"),
        (2, "bob@example.com"),
        (3, "carol@example.com"),
    ]
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO `User`(userID, email) VALUES (%s, %s)", users
        )

    # ---- 5. BankAccount supertype + ISA subtypes ----
    account_specs = []  # (IBAN, balance, bankID, userID, kind)
    iban_counter = 1
    for u in users:
        for b in banks:
            account_specs.append(
                (f"US{iban_counter:018d}", round(1500 + (iban_counter * 13) % 4000, 2),
                 b[0], u[0], "checking")
            )
            iban_counter += 1
            account_specs.append(
                (f"US{iban_counter:018d}", round(3000 + (iban_counter * 17) % 6000, 2),
                 b[0], u[0], "savings")
            )
            iban_counter += 1
    for u in users:
        account_specs.append(
            (f"US{iban_counter:018d}", round(-(300 + iban_counter * 5) % 1500, 2),
             4, u[0], "creditcard")
        )
        iban_counter += 1

    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO BankAccount(IBAN, balance, bankID, userID) VALUES (%s, %s, %s, %s)",
            [(a[0], a[1], a[2], a[3]) for a in account_specs],
        )
        for iban, _, _, _, kind in account_specs:
            if kind == "checking":
                cur.execute("INSERT INTO Checking(IBAN) VALUES (%s)", (iban,))
            elif kind == "savings":
                cur.execute(
                    "INSERT INTO Savings(IBAN, interestRate) VALUES (%s, %s)",
                    (iban, 0.015),
                )
            elif kind == "creditcard":
                cur.execute(
                    "INSERT INTO CreditCard(IBAN, creditLimit) VALUES (%s, %s)",
                    (iban, 5000.00),
                )

    all_ibans = [a[0] for a in account_specs]
    credit_card_ibans = [a[0] for a in account_specs if a[4] == "creditcard"]

    # ---- 5. Categories (from budget_benchmarks.csv + a general "Other" bucket) ----
    bench = pd.read_csv(DATA_DIR / "budget_benchmarks.csv")
    # ---- 6. Categories ----
    bench = pd.read_csv(DATA_DIR / "budget_benchmarks.csv")
    categories = [(int(r.categoryID), r.category_name) for r in bench.itertuples()]
    categories.append((6, "General & Other"))
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO Category(categoryID, name) VALUES (%s, %s)", categories
        )

    # ---- 7. Budgets ----
    budgets = []
    bid = 1
    for r in bench.itertuples():
        budgets.append((bid, float(r.limitAmount), r.month, 1, int(r.categoryID)))
        bid += 1
    budgets.append((bid, 400.00, "2026-11", 1, 6))
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO Budget(budgetID, limitAmount, month, userID, categoryID) "
            "VALUES (%s, %s, %s, %s, %s)",
            budgets,
        )

    # ---- 8. Subscriptions ----
    subs = pd.read_csv(DATA_DIR / "subscriptions.csv")
    subscription_rows = []
    sid = 1
    for i, r in subs.iterrows():
        service_name = str(r.get("service_name", f"Service {sid}"))
        amount = float(r.get("amount", 0) or 0)
        billing_cycle = r.get("billingCycle", "monthly")
        if pd.isna(billing_cycle) or str(billing_cycle).strip() == "":
            billing_cycle = "monthly"
        yearly_cost = float(r.get("yearlyCost", amount * 12) or amount * 12)
        subscription_rows.append((
            sid, amount, billing_cycle, yearly_cost,
            (i % len(users)) + 1,
            credit_card_ibans[i % len(credit_card_ibans)],
        ))
        sid += 1
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO Subscription(subID, amount, billingCycle, yearlyCost, userID, IBAN) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            subscription_rows,
        )

    # ---- 9. Transactions ----
    tx = pd.read_csv(DATA_DIR / "transactions.csv")
    cat_map = {
        "grocery_pos": 2, "grocery_net": 2, "food_dining": 2,
        "gas_transport": 3,
        "entertainment": 4,
        "misc_net": 6, "misc_pos": 6, "shopping_net": 6, "shopping_pos": 6,
    }

    tx_rows = []
    for _, r in tx.iterrows():
        raw_cat = str(r.get("category", "")).strip()
        category_id = cat_map.get(raw_cat, 6)
        # Synthesize dates from 2019 -> 2026 (shift +7 years) for a current dataset.
        raw_date = str(r.get("date", ""))[:10]
        try:
            dt = datetime.strptime(raw_date, "%Y-%m-%d")
            tx_date = dt.replace(year=dt.year + 7).strftime("%Y-%m-%d")
        except ValueError:
            tx_date = raw_date
        amount = float(r.get("amount", 0) or 0)
        iban = all_ibans[int(r["txNo"]) % len(all_ibans)]
        tx_rows.append((
            int(r["txNo"]), tx_date, amount, iban, category_id, None
        ))

    with conn.cursor() as cur:
        for start in range(0, len(tx_rows), 5000):
            chunk = tx_rows[start:start + 5000]
            cur.executemany(
                "INSERT INTO `Transaction`(txNo, txDate, amount, IBAN, categoryID, subID) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                chunk,
            )

    conn.commit()
    conn.close()
    print(f"[OK] MySQL database '{DB_NAME}' created and populated.")
    print(f"     Banks: {len(banks)}, Users: {len(users)}, Accounts: {len(account_specs)}")
    print(f"     Categories: {len(categories)}, Budgets: {len(budgets)}")
    print(f"     Subscriptions: {len(subscription_rows)}, Transactions: {len(tx_rows)}")


if __name__ == "__main__":
    init_db()

