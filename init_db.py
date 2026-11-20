"""
init_db.py
==========
Builds the financial_tracker MySQL database from schema.sql and populates it
with the Kaggle-derived data in processed_financial_data/ plus a few synthetic
monthly items (salary, rent, utility bills, named subscriptions).

Run:  python init_db.py
Re-run any time to reset the database (it drops and recreates all tables).

All dates are generated relative to the day you run this script, so the
dashboard always has data for the current month.
"""
import calendar
import random
from datetime import date, timedelta
from pathlib import Path

import pandas as pd
import pymysql

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

HISTORY_MONTHS = 120   # the 10,000 Kaggle card payments are spread over 10 years
rng = random.Random(3278)  # fixed seed -> same data on every run (same day)


def get_conn(database=None):
    cfg = dict(DB_CONFIG)
    if database:
        cfg["database"] = database
    return pymysql.connect(**cfg)


def add_months(d, n):
    m = d.month - 1 + n
    y = d.year + m // 12
    m = m % 12 + 1
    return date(y, m, min(d.day, calendar.monthrange(y, m)[1]))


def month_starts(first, last):
    """First day of every month from first to last (inclusive)."""
    d = date(first.year, first.month, 1)
    while d <= last:
        yield d
        d = add_months(d, 1)


def run_schema(conn):
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        sql = f.read()
    # Drop full-line comments, then split on ';'
    lines = [l for l in sql.splitlines() if not l.strip().startswith("--")]
    with conn.cursor() as cur:
        for statement in "\n".join(lines).split(";"):
            if statement.strip():
                cur.execute(statement)


def init_db():
    today = date.today()
    start = add_months(today, -HISTORY_MONTHS)

    # ---- 1. Database + schema ----
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME} "
                    f"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    conn.close()
    conn = get_conn(DB_NAME)
    run_schema(conn)
    cur = conn.cursor()

    # ---- 2. Banks and users ----
    banks = [(1, "Chase Bank"), (2, "Bank of America"), (3, "Wells Fargo"), (4, "Citibank")]
    users = [(1, "alice@example.com"), (2, "bob@example.com"), (3, "carol@example.com")]
    cur.executemany("INSERT INTO Bank(bankID, bankName) VALUES (%s, %s)", banks)
    cur.executemany("INSERT INTO `User`(userID, email) VALUES (%s, %s)", users)

    # ---- 3. Accounts (BankAccount supertype + one ISA subtype each) ----
    # Every user: a checking + savings account at each bank, plus one credit card.
    accounts = []          # (IBAN, balance, bankID, userID, kind)
    n = 1
    for uid, _ in users:
        for bid, _ in banks:
            accounts.append((f"US{n:018d}", round(1500 + (n * 137) % 4000, 2), bid, uid, "checking")); n += 1
            accounts.append((f"US{n:018d}", round(3000 + (n * 171) % 6000, 2), bid, uid, "savings")); n += 1
    for uid, _ in users:
        # negative balance on a credit card = amount owed
        accounts.append((f"US{n:018d}", -round(300 + (n * 53) % 1200, 2), 4, uid, "creditcard")); n += 1

    cur.executemany("INSERT INTO BankAccount(IBAN, balance, bankID, userID) VALUES (%s, %s, %s, %s)",
                    [a[:4] for a in accounts])
    for iban, _, _, _, kind in accounts:
        if kind == "checking":
            cur.execute("INSERT INTO Checking(IBAN) VALUES (%s)", (iban,))
        elif kind == "savings":
            cur.execute("INSERT INTO Savings(IBAN, interestRate) VALUES (%s, %s)", (iban, 0.0150))
        else:
            cur.execute("INSERT INTO CreditCard(IBAN, creditLimit) VALUES (%s, %s)", (iban, 5000.00))

    def user_accounts(uid, kind):
        return [a[0] for a in accounts if a[3] == uid and a[4] == kind]

    # ---- 4. Categories ----
    # 1-5 come from budget_benchmarks.csv, the rest group the other Kaggle categories
    bench = pd.read_csv(DATA_DIR / "budget_benchmarks.csv")
    categories = [(int(r.categoryID), r.category_name) for r in bench.itertuples()]
    categories += [
        (6, "General & Other"),
        (7, "Shopping"),
        (8, "Health & Personal Care"),
        (9, "Travel"),
        (10, "Subscriptions"),
        (11, "Income"),
    ]
    cur.executemany("INSERT INTO Category(categoryID, name) VALUES (%s, %s)", categories)

    # ---- 5. Budgets: benchmark limits for the last 3 months + this month ----
    budget_rows = []
    for uid, _ in users:
        for k in range(-3, 1):
            month = add_months(date(today.year, today.month, 1), k).strftime("%Y-%m")
            for r in bench.itertuples():
                budget_rows.append((float(r.limitAmount), month, uid, int(r.categoryID)))
            budget_rows.append((400.00, month, uid, 6))
    cur.executemany("INSERT INTO Budget(limitAmount, month, userID, categoryID) VALUES (%s, %s, %s, %s)",
                    budget_rows)

    # ---- 6. Subscriptions (named, synthetic) ----
    # subscriptions.csv only holds 3,069 identical $39/month rows with numeric
    # IDs instead of names, so a small named set per user is created instead.
    sub_templates = [
        ("Spotify", 10.99, "monthly"),
        ("Netflix", 15.49, "monthly"),
        ("iCloud+", 2.99, "monthly"),
        ("Gym membership", 39.00, "monthly"),   # $39/month as in subscriptions.csv
        ("Amazon Prime", 139.00, "yearly"),
        ("Disney+", 13.99, "monthly"),
    ]
    subs = []   # (subID, name, amount, cycle, userID, IBAN, start_day)
    sid = 1
    for uid, _ in users:
        card = user_accounts(uid, "creditcard")[0]
        checking = user_accounts(uid, "checking")[0]
        for i, (name, amount, cycle) in enumerate(sub_templates):
            if (uid + i) % 4 == 0:      # not every user has every service
                continue
            iban = checking if name in ("Gym membership", "iCloud+") else card
            subs.append((sid, name, amount, cycle, uid, iban, 1 + (sid * 7) % 27))
            sid += 1
    cur.executemany(
        "INSERT INTO Subscription(subID, serviceName, amount, billingCycle, userID, IBAN) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        [s[:6] for s in subs],
    )

    # ---- 7. Transactions ----
    tx = []   # (IBAN, txDate, amount, categoryID, subID)

    # 7a. Kaggle card payments: amounts kept, made negative (money out),
    #     dates spread over the last HISTORY_MONTHS months.
    kaggle = pd.read_csv(DATA_DIR / "transactions.csv")
    cat_map = {
        "home": 1,
        "grocery_pos": 2, "grocery_net": 2, "food_dining": 2,
        "gas_transport": 3,
        "entertainment": 4,
        "misc_net": 6, "misc_pos": 6, "kids_pets": 6,
        "shopping_net": 7, "shopping_pos": 7,
        "health_fitness": 8, "personal_care": 8,
        "travel": 9,
    }
    span_days = (today - start).days
    for i, r in enumerate(kaggle.itertuples()):
        uid = (i % len(users)) + 1
        spend_accounts = user_accounts(uid, "checking") + user_accounts(uid, "creditcard")
        # primary checking and the credit card are used most
        iban = rng.choices(spend_accounts, weights=[45, 6, 4, 5, 40])[0]
        tx_date = start + timedelta(days=rng.randint(0, span_days))
        tx.append((iban, tx_date, -round(float(r.amount), 2), cat_map.get(str(r.category), 6), None))

    # 7b. Synthetic monthly items: salary, rent, utilities (documented in README)
    salary = {1: 4200.00, 2: 3600.00, 3: 5100.00}
    rent = {1: 1050.00, 2: 980.00, 3: 1150.00}
    for uid, _ in users:
        main = user_accounts(uid, "checking")[0]
        for m in month_starts(start, today):
            for day, amount, cat in [
                (1, -rent[uid], 1),
                (5, -round(rng.uniform(115, 175), 2), 5),
                (25, salary[uid], 11),
            ]:
                d = date(m.year, m.month, min(day, calendar.monthrange(m.year, m.month)[1]))
                if start <= d <= today:
                    tx.append((main, d, amount, cat, None))

    # 7c. Subscription payments (pays_for relationship)
    step = {"monthly": 1, "quarterly": 3, "yearly": 12}
    for sub_id, name, amount, cycle, uid, iban, day in subs:
        if cycle == "weekly":
            d = start + timedelta(days=day % 7)
            while d <= today:
                tx.append((iban, d, -amount, 10, sub_id))
                d += timedelta(days=7)
            continue
        m = date(start.year, start.month, 1)
        while m <= today:
            d = date(m.year, m.month, min(day, calendar.monthrange(m.year, m.month)[1]))
            if start <= d <= today:
                tx.append((iban, d, -amount, 10, sub_id))
            m = add_months(m, step[cycle])

    # Number transactions 1, 2, 3 ... per account in date order (weak entity
    # partial key), then insert.
    tx.sort(key=lambda t: (t[0], t[1]))
    rows, counter = [], {}
    for iban, d, amount, cat, sub_id in tx:
        counter[iban] = counter.get(iban, 0) + 1
        rows.append((iban, counter[iban], d.isoformat(), amount, cat, sub_id))

    for s in range(0, len(rows), 5000):
        cur.executemany(
            "INSERT INTO `Transaction`(IBAN, txNo, txDate, amount, categoryID, subID) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            rows[s:s + 5000],
        )

    conn.commit()
    cur.close()
    conn.close()
    print(f"[OK] MySQL database '{DB_NAME}' created and populated.")
    print(f"     Banks: {len(banks)}, Users: {len(users)}, Accounts: {len(accounts)}")
    print(f"     Categories: {len(categories)}, Budgets: {len(budget_rows)}, Subscriptions: {len(subs)}")
    print(f"     Transactions: {len(rows)} ({len(kaggle)} from Kaggle, "
          f"{len(rows) - len(kaggle)} synthetic salary/rent/bills/subscriptions)")
    print(f"     Dates: {start.isoformat()} to {today.isoformat()}")


if __name__ == "__main__":
    init_db()
