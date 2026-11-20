"""
app.py
======
Financial Tracker: Flask web application backed by MySQL.

  * Dashboard, accounts, budgets, subscriptions, categories   (Read)
  * Add / edit / delete transactions                          (Create / Update / Delete)
  * Add / edit / delete bank accounts                         (Create / Update / Delete)

Every page shows the data of the user picked in the top-right menu.

Run:   flask --app app run --debug
Setup: pip install -r requirements.txt
       python init_db.py          # build + populate the MySQL database

Look for "KEY SQL" comments for the statements worth presenting.
"""
import calendar
import os
from datetime import date, timedelta
from decimal import Decimal

import pymysql.cursors
from flask import Flask, flash, redirect, render_template, request, session, url_for
from markupsafe import Markup

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")

DB_CONFIG = {
    "host": "localhost",
    "user": "finance_app",
    "password": "finance_app_2026",
    "database": "financial_tracker",
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor,
    "autocommit": True,
}


def get_db():
    return pymysql.connect(**DB_CONFIG)


def query(sql, params=(), one=False):
    """Run a SELECT and return all rows (or the first row)."""
    db = get_db()
    try:
        with db.cursor() as cur:
            cur.execute(sql, params)
            return cur.fetchone() if one else cur.fetchall()
    finally:
        db.close()


@app.cli.command("init-db")
def init_db_command():
    import init_db  # noqa
    init_db.init_db()
    print("Initialized the database.")


# ---------------------------------------------------------------------------
# Helpers: current user, months, formatting
# ---------------------------------------------------------------------------
def current_user_id():
    return session.get("user_id", 1)


def month_bounds(ym):
    """'2026-11' -> (date(2026,11,1), date(2026,12,1))"""
    y, m = map(int, ym.split("-"))
    start = date(y, m, 1)
    end = date(y + (m == 12), m % 12 + 1, 1)
    return start, end


def shift_month(ym, delta):
    y, m = map(int, ym.split("-"))
    m += delta
    y += (m - 1) // 12
    m = (m - 1) % 12 + 1
    return f"{y:04d}-{m:02d}"


def valid_month(ym):
    try:
        month_bounds(ym)
        return True
    except (ValueError, AttributeError):
        return False


def this_month():
    return date.today().strftime("%Y-%m")


@app.template_filter("money")
def money_filter(value, signed=False):
    """1234.5 -> $1,234<small>.50</small>, with a real minus sign."""
    v = Decimal(str(value or 0))
    sign = "−" if v < 0 else ("+" if signed and v > 0 else "")
    whole, cents = f"{abs(v):,.2f}".split(".")
    return Markup(f'<span class="money">{sign}${whole}<span class="cents">.{cents}</span></span>')


@app.template_filter("usd")
def usd_filter(value):
    v = Decimal(str(value or 0))
    return f"{'-' if v < 0 else ''}${abs(v):,.2f}"


@app.template_filter("day_label")
def day_label(d):
    today = date.today()
    if d == today:
        return "Today"
    if d == today - timedelta(days=1):
        return "Yesterday"
    label = f"{d:%a}, {d.day} {d:%b}"
    return label if d.year == today.year else f"{label} {d.year}"


@app.template_filter("month_label")
def month_label(ym, short=False):
    y, m = map(int, ym.split("-"))
    return calendar.month_name[m] if short else f"{calendar.month_name[m]} {y}"


@app.template_filter("last4")
def last4(iban):
    """Masked account number: only the last 4 characters are shown."""
    return Markup('<span class="mask">&bull;&bull;</span>') + str(iban)[-4:]


# Icon + tint for each category (icons are SVG symbols in base.html)
CATEGORY_STYLE = {
    "Housing": ("home", "t-indigo"),
    "Food & Groceries": ("basket", "t-green"),
    "Transportation": ("car", "t-blue"),
    "Entertainment": ("ticket", "t-violet"),
    "Utilities": ("bolt", "t-amber"),
    "General & Other": ("dots", "t-slate"),
    "Shopping": ("bag", "t-rose"),
    "Health & Personal Care": ("heart", "t-red"),
    "Travel": ("plane", "t-sky"),
    "Subscriptions": ("repeat", "t-navy"),
    "Income": ("arrow-in", "t-green"),
}

ACCOUNT_TYPE_LABEL = {"checking": "Checking", "savings": "Savings", "creditcard": "Credit card"}


@app.context_processor
def inject_globals():
    users = query("SELECT userID, email FROM `User` ORDER BY userID")
    uid = current_user_id()
    me = next((u for u in users if u["userID"] == uid), users[0] if users else None)
    return {
        "all_users": users,
        "me": me,
        "category_style": lambda name: CATEGORY_STYLE.get(name or "", ("dots", "t-slate")),
        "type_label": ACCOUNT_TYPE_LABEL,
    }


@app.route("/switch-user", methods=["POST"])
def switch_user():
    session["user_id"] = int(request.form["userID"])
    return redirect(request.form.get("next") or url_for("index"))


# Account type comes from whichever ISA subtype table holds the IBAN
ACCOUNT_SELECT = """
    SELECT ba.IBAN, ba.balance, ba.bankID, b.bankName, ba.userID,
           CASE
             WHEN c.IBAN  IS NOT NULL THEN 'checking'
             WHEN s.IBAN  IS NOT NULL THEN 'savings'
             WHEN cc.IBAN IS NOT NULL THEN 'creditcard'
           END AS type,
           s.interestRate, cc.creditLimit
    FROM BankAccount ba
    JOIN Bank b              ON b.bankID = ba.bankID
    LEFT JOIN Checking c     ON c.IBAN  = ba.IBAN
    LEFT JOIN Savings s      ON s.IBAN  = ba.IBAN
    LEFT JOIN CreditCard cc  ON cc.IBAN = ba.IBAN
"""


def user_accounts(uid):
    return query(ACCOUNT_SELECT + """
        WHERE ba.userID = %s
        ORDER BY FIELD(type, 'checking', 'creditcard', 'savings'), ba.balance DESC
    """, (uid,))


TX_SELECT = """
    SELECT t.IBAN, t.txNo, t.txDate, t.amount, t.categoryID, t.subID,
           c.name AS category, s.serviceName, b.bankName
    FROM `Transaction` t
    JOIN BankAccount ba      ON ba.IBAN = t.IBAN
    JOIN Bank b              ON b.bankID = ba.bankID
    LEFT JOIN Category c     ON c.categoryID = t.categoryID
    LEFT JOIN Subscription s ON s.subID = t.subID
"""


# KEY SQL: budget vs actual for one user and one month.
# Spending is summed per category over all of the user's accounts
# (join through BankAccount), only money out, only inside the month.
BUDGET_SQL = """
    SELECT b.budgetID, c.categoryID, c.name AS category, b.limitAmount,
           COALESCE(s.spent, 0) AS spent
    FROM Budget b
    JOIN Category c ON c.categoryID = b.categoryID
    LEFT JOIN (
        SELECT t.categoryID, -SUM(t.amount) AS spent
        FROM `Transaction` t
        JOIN BankAccount ba ON ba.IBAN = t.IBAN
        WHERE ba.userID = %s
          AND t.amount < 0
          AND t.txDate >= %s AND t.txDate < %s
        GROUP BY t.categoryID
    ) s ON s.categoryID = b.categoryID
    WHERE b.userID = %s AND b.month = %s
    ORDER BY c.name
"""


def budget_status(uid, ym):
    start, end = month_bounds(ym)
    rows = query(BUDGET_SQL, (uid, start, end, uid, ym))
    for r in rows:
        r["pct"] = float(r["spent"] / r["limitAmount"] * 100) if r["limitAmount"] else 0
        r["state"] = "over" if r["pct"] > 100 else "near" if r["pct"] >= 80 else "ok"
        r["left"] = r["limitAmount"] - r["spent"]
    return rows


# KEY SQL: spending per category in a month (GROUP BY + SUM)
CATEGORY_SPEND_SQL = """
    SELECT c.categoryID, c.name AS category, -SUM(t.amount) AS spent, COUNT(*) AS tx_count
    FROM `Transaction` t
    JOIN BankAccount ba  ON ba.IBAN = t.IBAN
    LEFT JOIN Category c ON c.categoryID = t.categoryID
    WHERE ba.userID = %s AND t.amount < 0
      AND t.txDate >= %s AND t.txDate < %s
    GROUP BY c.categoryID, c.name
    ORDER BY spent DESC
"""


# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------
@app.route("/")
def index():
    uid = current_user_id()
    ym = this_month()
    start, end = month_bounds(ym)
    prev_start, _ = month_bounds(shift_month(ym, -1))

    accounts = user_accounts(uid)
    total_balance = sum(a["balance"] for a in accounts)

    flow = query("""
        SELECT COALESCE(SUM(CASE WHEN t.amount > 0 THEN t.amount END), 0)  AS money_in,
               COALESCE(-SUM(CASE WHEN t.amount < 0 THEN t.amount END), 0) AS money_out
        FROM `Transaction` t
        JOIN BankAccount ba ON ba.IBAN = t.IBAN
        WHERE ba.userID = %s AND t.txDate >= %s AND t.txDate < %s
    """, (uid, start, end), one=True)

    # Spending last month up to the same day, for a fair comparison
    same_day_last_month = prev_start + timedelta(days=date.today().day)
    last = query("""
        SELECT COALESCE(-SUM(t.amount), 0) AS spent
        FROM `Transaction` t
        JOIN BankAccount ba ON ba.IBAN = t.IBAN
        WHERE ba.userID = %s AND t.amount < 0
          AND t.txDate >= %s AND t.txDate < %s
    """, (uid, prev_start, min(same_day_last_month, start)), one=True)

    by_category = query(CATEGORY_SPEND_SQL, (uid, start, end))
    recent = query(TX_SELECT + """
        WHERE ba.userID = %s
        ORDER BY t.txDate DESC, t.txNo DESC
        LIMIT 8
    """, (uid,))
    subs = query("""
        SELECT COUNT(*) AS n, COALESCE(SUM(yearlyCost), 0) AS yearly
        FROM SubscriptionCost WHERE userID = %s
    """, (uid,), one=True)

    return render_template(
        "index.html",
        month=ym,
        accounts=accounts,
        total_balance=total_balance,
        flow=flow,
        last_month_spent=last["spent"],
        by_category=by_category,
        budgets=budget_status(uid, ym),
        recent=recent,
        subs=subs,
    )


# Chart data (JSON for Chart.js): spending so far this month vs last month,
# added up day by day
def daily_spending(uid, ym):
    start, end = month_bounds(ym)
    rows = query("""
        SELECT DAY(t.txDate) AS d, -SUM(t.amount) AS spent
        FROM `Transaction` t
        JOIN BankAccount ba ON ba.IBAN = t.IBAN
        WHERE ba.userID = %s AND t.amount < 0
          AND t.txDate >= %s AND t.txDate < %s
        GROUP BY DAY(t.txDate)
    """, (uid, start, end))
    return {r["d"]: float(r["spent"]) for r in rows}, (end - timedelta(days=1)).day


def running_total(by_day, days, stop=None):
    total, out = 0.0, []
    for d in range(1, days + 1):
        total += by_day.get(d, 0)
        out.append(round(total, 2) if stop is None or d <= stop else None)
    return out


@app.route("/api/chart-data")
def chart_data():
    uid = current_user_id()
    ym = this_month()
    this_days, n_this = daily_spending(uid, ym)
    last_days, n_last = daily_spending(uid, shift_month(ym, -1))
    n = max(n_this, n_last)
    return {
        "labels": [str(d) for d in range(1, n + 1)],
        "this_month": running_total(this_days, n_this, stop=date.today().day),
        "last_month": running_total(last_days, n_last),
    }


# ---------------------------------------------------------------------------
# Transactions: Read (list with filters, paginated)
# ---------------------------------------------------------------------------
@app.route("/transactions")
def transactions():
    uid = current_user_id()
    page = max(1, request.args.get("page", 1, type=int))
    per_page = 30
    f_category = request.args.get("category", "")
    f_iban = request.args.get("iban", "")
    f_month = request.args.get("month", "")

    where, params = ["ba.userID = %s"], [uid]
    if f_category == "none":
        where.append("t.categoryID IS NULL")
    elif f_category:
        where.append("t.categoryID = %s"); params.append(int(f_category))
    if f_iban:
        where.append("t.IBAN = %s"); params.append(f_iban)
    if f_month and valid_month(f_month):
        s, e = month_bounds(f_month)
        where.append("t.txDate >= %s AND t.txDate < %s"); params += [s, e]
    where_sql = " WHERE " + " AND ".join(where)

    rows = query(TX_SELECT + where_sql + """
        ORDER BY t.txDate DESC, t.txNo DESC
        LIMIT %s OFFSET %s
    """, (*params, per_page, (page - 1) * per_page))

    totals = query("""
        SELECT COUNT(*) AS n,
               COALESCE(SUM(CASE WHEN t.amount > 0 THEN t.amount END), 0)  AS money_in,
               COALESCE(-SUM(CASE WHEN t.amount < 0 THEN t.amount END), 0) AS money_out
        FROM `Transaction` t JOIN BankAccount ba ON ba.IBAN = t.IBAN
    """ + where_sql, params, one=True)

    return render_template(
        "transactions.html",
        transactions=rows,
        totals=totals,
        categories=query("SELECT categoryID, name FROM Category ORDER BY name"),
        accounts=user_accounts(uid),
        months=[shift_month(this_month(), -k) for k in range(24)],
        f_category=f_category, f_iban=f_iban, f_month=f_month,
        page=page,
        total_pages=max(1, (totals["n"] + per_page - 1) // per_page),
    )


def transaction_form_data(uid):
    return dict(
        accounts=user_accounts(uid),
        categories=query("SELECT categoryID, name FROM Category ORDER BY name"),
        subscriptions=query(
            "SELECT subID, serviceName, amount FROM Subscription WHERE userID = %s ORDER BY serviceName",
            (uid,)),
    )


def read_transaction_form():
    """Returns (values, error). The form sends a positive amount + direction."""
    f = request.form
    try:
        amount = Decimal(f["amount"])
    except Exception:
        return None, "Enter an amount, for example 12.50."
    if amount <= 0:
        return None, "Enter an amount above zero."
    if not f.get("txDate"):
        return None, "Pick a date."
    return {
        "txDate": f["txDate"],
        "amount": amount if f.get("direction") == "in" else -amount,
        "categoryID": int(f["categoryID"]) if f.get("categoryID") else None,
        "subID": int(f["subID"]) if f.get("subID") else None,
    }, None


# ---------------------------------------------------------------------------
# Transactions: Create
# KEY SQL: Transaction is a weak entity, so its key is (IBAN, txNo).
#   1. lock the account row      SELECT ... FOR UPDATE
#   2. next partial key          SELECT COALESCE(MAX(txNo), 0) + 1 ...
#   3. insert the transaction
#   4. update the balance
# all inside one SQL transaction, so balance and history always agree.
# ---------------------------------------------------------------------------
@app.route("/transactions/new", methods=["GET", "POST"])
def new_transaction():
    uid = current_user_id()
    if request.method == "POST":
        values, error = read_transaction_form()
        iban = request.form.get("IBAN", "")
        if not query("SELECT 1 AS ok FROM BankAccount WHERE IBAN = %s AND userID = %s", (iban, uid), one=True):
            error = error or "Pick one of your accounts."
        if error:
            flash(error, "error")
            return render_template("transaction_form.html", mode="Create", tx=None,
                                   form=request.form, **transaction_form_data(uid))
        db = get_db()
        try:
            db.begin()
            with db.cursor() as cur:
                cur.execute("SELECT balance FROM BankAccount WHERE IBAN = %s FOR UPDATE", (iban,))
                cur.execute("SELECT COALESCE(MAX(txNo), 0) + 1 AS nextNo FROM `Transaction` WHERE IBAN = %s",
                            (iban,))
                tx_no = cur.fetchone()["nextNo"]
                cur.execute(
                    "INSERT INTO `Transaction`(IBAN, txNo, txDate, amount, categoryID, subID) "
                    "VALUES (%s, %s, %s, %s, %s, %s)",
                    (iban, tx_no, values["txDate"], values["amount"], values["categoryID"], values["subID"]),
                )
                cur.execute("UPDATE BankAccount SET balance = balance + %s WHERE IBAN = %s",
                            (values["amount"], iban))
            db.commit()
        except Exception as e:
            db.rollback()
            flash(f"Could not save the transaction: {e}", "error")
            return redirect(url_for("new_transaction"))
        finally:
            db.close()
        flash("Transaction added", "success")
        return redirect(url_for("transactions"))

    preset = {"IBAN": request.args.get("iban", ""), "txDate": date.today().isoformat()}
    return render_template("transaction_form.html", mode="Create", tx=None, form=preset,
                           **transaction_form_data(uid))


def load_own_transaction(uid, iban, tx_no):
    return query(TX_SELECT + " WHERE t.IBAN = %s AND t.txNo = %s AND ba.userID = %s",
                 (iban, tx_no, uid), one=True)


# ---------------------------------------------------------------------------
# Transactions: Update (balance changes by new amount - old amount)
# ---------------------------------------------------------------------------
@app.route("/transactions/<iban>/<int:tx_no>/edit", methods=["GET", "POST"])
def edit_transaction(iban, tx_no):
    uid = current_user_id()
    tx = load_own_transaction(uid, iban, tx_no)
    if tx is None:
        flash("Transaction not found.", "error")
        return redirect(url_for("transactions"))

    if request.method == "POST":
        values, error = read_transaction_form()
        if error:
            flash(error, "error")
            return render_template("transaction_form.html", mode="Edit", tx=tx,
                                   form=request.form, **transaction_form_data(uid))
        db = get_db()
        try:
            db.begin()
            with db.cursor() as cur:
                cur.execute("SELECT amount FROM `Transaction` WHERE IBAN = %s AND txNo = %s FOR UPDATE",
                            (iban, tx_no))
                old_amount = cur.fetchone()["amount"]
                cur.execute(
                    "UPDATE `Transaction` SET txDate = %s, amount = %s, categoryID = %s, subID = %s "
                    "WHERE IBAN = %s AND txNo = %s",
                    (values["txDate"], values["amount"], values["categoryID"], values["subID"], iban, tx_no),
                )
                cur.execute("UPDATE BankAccount SET balance = balance + %s - %s WHERE IBAN = %s",
                            (values["amount"], old_amount, iban))
            db.commit()
        except Exception as e:
            db.rollback()
            flash(f"Could not update the transaction: {e}", "error")
            return redirect(url_for("edit_transaction", iban=iban, tx_no=tx_no))
        finally:
            db.close()
        flash("Transaction updated", "success")
        return redirect(url_for("transactions"))

    form = {"txDate": tx["txDate"].isoformat(), "amount": abs(tx["amount"]),
            "direction": "in" if tx["amount"] > 0 else "out", "IBAN": tx["IBAN"],
            "categoryID": tx["categoryID"] or "", "subID": tx["subID"] or ""}
    return render_template("transaction_form.html", mode="Edit", tx=tx, form=form,
                           **transaction_form_data(uid))


# ---------------------------------------------------------------------------
# Transactions: Delete (balance changes back)
# ---------------------------------------------------------------------------
@app.route("/transactions/<iban>/<int:tx_no>/delete", methods=["POST"])
def delete_transaction(iban, tx_no):
    uid = current_user_id()
    if load_own_transaction(uid, iban, tx_no) is None:
        flash("Transaction not found.", "error")
        return redirect(url_for("transactions"))
    db = get_db()
    try:
        db.begin()
        with db.cursor() as cur:
            cur.execute("SELECT amount FROM `Transaction` WHERE IBAN = %s AND txNo = %s FOR UPDATE",
                        (iban, tx_no))
            amount = cur.fetchone()["amount"]
            cur.execute("DELETE FROM `Transaction` WHERE IBAN = %s AND txNo = %s", (iban, tx_no))
            cur.execute("UPDATE BankAccount SET balance = balance - %s WHERE IBAN = %s", (amount, iban))
        db.commit()
    except Exception as e:
        db.rollback()
        flash(f"Could not delete the transaction: {e}", "error")
        return redirect(url_for("transactions"))
    finally:
        db.close()
    flash("Transaction deleted", "success")
    return redirect(url_for("transactions"))


# ---------------------------------------------------------------------------
# Accounts: Read
# ---------------------------------------------------------------------------
@app.route("/accounts")
def accounts():
    uid = current_user_id()
    rows = user_accounts(uid)
    groups = [(t, [a for a in rows if a["type"] == t]) for t in ("checking", "savings", "creditcard")]
    return render_template("accounts.html", groups=groups, accounts=rows,
                           total=sum(a["balance"] for a in rows))


def read_account_form():
    """Returns (values, error). Credit cards take 'amount owed' instead of a balance."""
    f = request.form
    acct_type = f.get("type")
    if acct_type not in ACCOUNT_TYPE_LABEL:
        return None, "Choose an account type."
    try:
        if acct_type == "creditcard":
            balance = -Decimal(f.get("owed") or 0)
            limit = Decimal(f.get("creditLimit") or 0)
            if limit <= 0:
                return None, "Enter a credit limit above zero."
        else:
            balance = Decimal(f.get("balance") or 0)
            limit = None
        rate = Decimal(f.get("interestRate") or 0) / 100 if acct_type == "savings" else None
    except Exception:
        return None, "Check the numbers you entered."
    return {"type": acct_type, "balance": balance, "bankID": int(f["bankID"]),
            "creditLimit": limit, "interestRate": rate}, None


def write_subtype(cur, iban, v):
    """ISA: make sure the account is in exactly one subtype table."""
    cur.execute("DELETE FROM Checking WHERE IBAN = %s", (iban,))
    cur.execute("DELETE FROM Savings WHERE IBAN = %s", (iban,))
    cur.execute("DELETE FROM CreditCard WHERE IBAN = %s", (iban,))
    if v["type"] == "checking":
        cur.execute("INSERT INTO Checking(IBAN) VALUES (%s)", (iban,))
    elif v["type"] == "savings":
        cur.execute("INSERT INTO Savings(IBAN, interestRate) VALUES (%s, %s)", (iban, v["interestRate"]))
    else:
        cur.execute("INSERT INTO CreditCard(IBAN, creditLimit) VALUES (%s, %s)", (iban, v["creditLimit"]))


# ---------------------------------------------------------------------------
# Accounts: Create
# KEY SQL: one row in BankAccount + one row in exactly one subtype table,
# in a single SQL transaction (ISA, disjoint).
# ---------------------------------------------------------------------------
@app.route("/accounts/new", methods=["GET", "POST"])
def new_account():
    uid = current_user_id()
    banks = query("SELECT bankID, bankName FROM Bank ORDER BY bankName")
    if request.method == "POST":
        values, error = read_account_form()
        iban = request.form.get("IBAN", "").replace(" ", "").upper()
        if not error and not (8 <= len(iban) <= 34 and iban[:2].isalpha() and iban.isalnum()):
            error = "That IBAN doesn't look right. It starts with a 2-letter country code, e.g. US00 0000 ..."
        if not error and query("SELECT 1 AS ok FROM BankAccount WHERE IBAN = %s", (iban,), one=True):
            error = "An account with this IBAN already exists."
        if error:
            flash(error, "error")
            return render_template("account_form.html", mode="Create", account=None,
                                   banks=banks, form=request.form)
        db = get_db()
        try:
            db.begin()
            with db.cursor() as cur:
                cur.execute("INSERT INTO BankAccount(IBAN, balance, bankID, userID) VALUES (%s, %s, %s, %s)",
                            (iban, values["balance"], values["bankID"], uid))
                write_subtype(cur, iban, values)
            db.commit()
            flash("Account added", "success")
        except Exception as e:
            db.rollback()
            flash(f"Could not create the account: {e}", "error")
        finally:
            db.close()
        return redirect(url_for("accounts"))

    return render_template("account_form.html", mode="Create", account=None, banks=banks,
                           form={"type": request.args.get("type", "checking")})


# ---------------------------------------------------------------------------
# Accounts: Update (also lets you move an account to another subtype)
# ---------------------------------------------------------------------------
@app.route("/accounts/<iban>/edit", methods=["GET", "POST"])
def edit_account(iban):
    uid = current_user_id()
    account = query(ACCOUNT_SELECT + " WHERE ba.IBAN = %s AND ba.userID = %s", (iban, uid), one=True)
    if account is None:
        flash("Account not found.", "error")
        return redirect(url_for("accounts"))
    banks = query("SELECT bankID, bankName FROM Bank ORDER BY bankName")
    tx_count = query("SELECT COUNT(*) AS n FROM `Transaction` WHERE IBAN = %s", (iban,), one=True)["n"]

    if request.method == "POST":
        values, error = read_account_form()
        if error:
            flash(error, "error")
            return render_template("account_form.html", mode="Edit", account=account, banks=banks,
                                   form=request.form, tx_count=tx_count)
        db = get_db()
        try:
            db.begin()
            with db.cursor() as cur:
                cur.execute("UPDATE BankAccount SET balance = %s, bankID = %s WHERE IBAN = %s",
                            (values["balance"], values["bankID"], iban))
                write_subtype(cur, iban, values)
            db.commit()
            flash("Account updated", "success")
        except Exception as e:
            db.rollback()
            flash(f"Could not update the account: {e}", "error")
        finally:
            db.close()
        return redirect(url_for("accounts"))

    form = {
        "type": account["type"], "bankID": account["bankID"],
        "balance": account["balance"] if account["type"] != "creditcard" else "",
        "owed": -account["balance"] if account["type"] == "creditcard" else "",
        "interestRate": (account["interestRate"] or Decimal("0.015")) * 100,
        "creditLimit": account["creditLimit"] or 5000,
    }
    return render_template("account_form.html", mode="Edit", account=account, banks=banks,
                           form=form, tx_count=tx_count)


# ---------------------------------------------------------------------------
# Accounts: Delete (only accounts without transactions, so history is never lost)
# ---------------------------------------------------------------------------
@app.route("/accounts/<iban>/delete", methods=["POST"])
def delete_account(iban):
    uid = current_user_id()
    n = query("SELECT COUNT(*) AS n FROM `Transaction` WHERE IBAN = %s", (iban,), one=True)["n"]
    if n > 0:
        flash(f"This account still has {n} transactions. Delete those first.", "error")
        return redirect(url_for("edit_account", iban=iban))
    db = get_db()
    try:
        with db.cursor() as cur:
            # ON DELETE CASCADE removes the subtype row
            cur.execute("DELETE FROM BankAccount WHERE IBAN = %s AND userID = %s", (iban, uid))
    finally:
        db.close()
    flash("Account deleted", "success")
    return redirect(url_for("accounts"))


# ---------------------------------------------------------------------------
# Budgets: Read (budget vs actual, any month)
# ---------------------------------------------------------------------------
@app.route("/budgets")
def budgets():
    uid = current_user_id()
    ym = request.args.get("month", this_month())
    if not valid_month(ym):
        ym = this_month()
    rows = budget_status(uid, ym)
    return render_template(
        "budgets.html",
        budgets=rows,
        month=ym,
        prev_month=shift_month(ym, -1),
        next_month=shift_month(ym, 1),
        total_limit=sum(r["limitAmount"] for r in rows),
        total_spent=sum(r["spent"] for r in rows),
    )


# ---------------------------------------------------------------------------
# Subscriptions: Read
# KEY SQL: yearlyCost (derived attribute) comes from the view, last payment
# is a correlated subquery over pays_for (Transaction.subID).
# ---------------------------------------------------------------------------
@app.route("/subscriptions")
def subscriptions():
    uid = current_user_id()
    rows = query("""
        SELECT sc.subID, sc.serviceName, sc.amount, sc.billingCycle, sc.yearlyCost, sc.IBAN,
               b.bankName,
               (SELECT MAX(t.txDate) FROM `Transaction` t WHERE t.subID = sc.subID) AS lastPaid
        FROM SubscriptionCost sc
        JOIN BankAccount ba ON ba.IBAN = sc.IBAN
        JOIN Bank b         ON b.bankID = ba.bankID
        WHERE sc.userID = %s
        ORDER BY sc.yearlyCost DESC
    """, (uid,))
    total_yearly = sum(r["yearlyCost"] for r in rows)
    return render_template("subscriptions.html", subscriptions=rows, total_yearly=total_yearly)


# ---------------------------------------------------------------------------
# Categories: Read (spending per category for a month)
# ---------------------------------------------------------------------------
@app.route("/categories")
def categories():
    uid = current_user_id()
    ym = request.args.get("month", this_month())
    if not valid_month(ym):
        ym = this_month()
    start, end = month_bounds(ym)
    rows = query(CATEGORY_SPEND_SQL, (uid, start, end))
    total = sum(r["spent"] for r in rows)
    return render_template("categories.html", categories=rows, total=total, month=ym,
                           prev_month=shift_month(ym, -1), next_month=shift_month(ym, 1))
