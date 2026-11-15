"""
app.py
======
Financial Tracker — Flask web application backed by MySQL.

Core functions (CRUD) on the financial tracking database:
  * View dashboard / accounts / budgets / subscriptions / categories   (Read)
  * Add / edit / delete transactions                                   (Create / Update / Delete)

Run:  flask --app app run --debug
Setup:
  pip install -r requirements.txt
  python init_db.py          # build + populate MySQL database
"""
import os
from flask import Flask, render_template, request, redirect, url_for, flash
import pymysql.cursors

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


@app.cli.command("init-db")
def init_db_command():
    import init_db  # noqa
    init_db.init_db()
    print("Initialized the database.")


# ---------------------------------------------------------------------------
# Chart data API (JSON for Chart.js)
# ---------------------------------------------------------------------------
@app.route("/api/chart-data")
def chart_data():
    db = get_db()
    cur = db.cursor()

    # Daily spending trend (last 7 days of data)
    cur.execute(
        """
        SELECT DATE(txDate) AS day, SUM(amount) AS total
        FROM `Transaction`
        GROUP BY DATE(txDate)
        ORDER BY day
        """
    )
    daily = cur.fetchall()
    daily_labels = [d["day"].strftime("%b %d") for d in daily]
    daily_values = [float(d["total"]) for d in daily]

    # Spending by category (doughnut)
    cur.execute(
        """
        SELECT c.name AS category,
               COALESCE(SUM(t.amount), 0) AS spent
        FROM Category c
        LEFT JOIN `Transaction` t ON t.categoryID = c.categoryID
        GROUP BY c.categoryID, c.name
        ORDER BY spent DESC
        """
    )
    cats = cur.fetchall()
    cat_labels = [c["category"] for c in cats]
    cat_values = [float(c["spent"]) for c in cats]

    # Account balances
    cur.execute(
        """
        SELECT ba.IBAN, ba.balance,
               CASE
                 WHEN EXISTS(SELECT 1 FROM Checking c WHERE c.IBAN = ba.IBAN) THEN 'Checking'
                 WHEN EXISTS(SELECT 1 FROM Savings s WHERE s.IBAN = ba.IBAN) THEN 'Savings'
                 WHEN EXISTS(SELECT 1 FROM CreditCard cc WHERE cc.IBAN = ba.IBAN) THEN 'Credit Card'
                 ELSE 'Account'
               END AS type
        FROM BankAccount ba
        ORDER BY ba.balance DESC
        """
    )
    accts = cur.fetchall()
    acct_labels = [a["IBAN"][-8:] for a in accts]
    acct_values = [float(a["balance"]) for a in accts]

    cur.close()
    db.close()
    return {
        "daily": {"labels": daily_labels, "values": daily_values},
        "categories": {"labels": cat_labels, "values": cat_values},
        "accounts": {"labels": acct_labels, "values": acct_values},
    }


# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------
@app.route("/")
def index():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT COALESCE(SUM(amount), 0) AS total FROM `Transaction`")
    total_spending = cur.fetchone()["total"]

    cur.execute("SELECT COUNT(*) AS c FROM `Transaction`")
    tx_count = cur.fetchone()["c"]

    cur.execute("SELECT IBAN, balance, bankID, userID FROM BankAccount ORDER BY IBAN")
    accounts = cur.fetchall()
    total_balance = sum(a["balance"] for a in accounts)

    cur.execute(
        """
        SELECT c.name AS category,
               COALESCE(SUM(t.amount), 0) AS spent
        FROM Category c
        LEFT JOIN `Transaction` t ON t.categoryID = c.categoryID
        GROUP BY c.categoryID, c.name
        ORDER BY spent DESC
        """
    )
    spending_by_category = cur.fetchall()

    cur.execute(
        """
        SELECT c.name AS category, b.limitAmount,
               COALESCE(SUM(t.amount), 0) AS spent,
               (b.limitAmount - COALESCE(SUM(t.amount), 0)) AS remaining
        FROM Budget b
        JOIN Category c ON c.categoryID = b.categoryID
        LEFT JOIN `Transaction` t
          ON t.categoryID = c.categoryID
         AND DATE_FORMAT(t.txDate, '%Y-%m') = SUBSTRING(b.month, 1, 7)
        WHERE b.userID = 1 AND b.month = (SELECT MAX(month) FROM Budget WHERE userID = 1)
        GROUP BY b.budgetID, c.name, b.limitAmount
        ORDER BY c.name
        """
    )
    budget_status = cur.fetchall()

    cur.execute(
        """
        SELECT t.txNo, t.txDate, t.amount, c.name AS category, ba.IBAN
        FROM `Transaction` t
        JOIN Category c ON c.categoryID = t.categoryID
        JOIN BankAccount ba ON ba.IBAN = t.IBAN
        ORDER BY t.txDate DESC, t.txNo DESC
        LIMIT 10
        """
    )
    recent_tx = cur.fetchall()

    cur.execute(
        "SELECT subID, amount, billingCycle, yearlyCost FROM Subscription ORDER BY subID LIMIT 8"
    )
    subscriptions = cur.fetchall()

    cur.close()
    db.close()
    return render_template(
        "index.html",
        total_spending=total_spending,
        tx_count=tx_count,
        accounts=accounts,
        total_balance=total_balance,
        spending_by_category=spending_by_category,
        budget_status=budget_status,
        recent_tx=recent_tx,
        subscriptions=subscriptions,
    )
# ---------------------------------------------------------------------------
# Transactions — Read (list, paginated, optional category filter)
# ---------------------------------------------------------------------------
@app.route("/transactions")
def transactions():
    db = get_db()
    cur = db.cursor()
    page = int(request.args.get("page", 1))
    per_page = 25
    offset = (page - 1) * per_page

    category_filter = request.args.get("category", "")
    if category_filter:
        cur.execute(
            """
            SELECT t.txNo, t.txDate, t.amount, c.name AS category, ba.IBAN
            FROM `Transaction` t
            JOIN Category c ON c.categoryID = t.categoryID
            JOIN BankAccount ba ON ba.IBAN = t.IBAN
            WHERE c.name = %s
            ORDER BY t.txDate DESC, t.txNo DESC
            LIMIT %s OFFSET %s
            """,
            (category_filter, per_page, offset),
        )
        tx_rows = cur.fetchall()
        cur.execute(
            "SELECT COUNT(*) AS c FROM `Transaction` t "
            "JOIN Category c ON c.categoryID = t.categoryID WHERE c.name = %s",
            (category_filter,),
        )
        total = cur.fetchone()["c"]
    else:
        cur.execute(
            """
            SELECT t.txNo, t.txDate, t.amount, c.name AS category, ba.IBAN
            FROM `Transaction` t
            JOIN Category c ON c.categoryID = t.categoryID
            JOIN BankAccount ba ON ba.IBAN = t.IBAN
            ORDER BY t.txDate DESC, t.txNo DESC
            LIMIT %s OFFSET %s
            """,
            (per_page, offset),
        )
        tx_rows = cur.fetchall()
        cur.execute("SELECT COUNT(*) AS c FROM `Transaction`")
        total = cur.fetchone()["c"]

    cur.execute("SELECT categoryID, name FROM Category ORDER BY name")
    categories = cur.fetchall()
    total_pages = (total + per_page - 1) // per_page
    cur.close()
    db.close()
    return render_template(
        "transactions.html",
        transactions=tx_rows,
        categories=categories,
        category_filter=category_filter,
        page=page,
        total_pages=total_pages,
        total=total,
    )


# ---------------------------------------------------------------------------
# Transactions — Create (new)
# ---------------------------------------------------------------------------
@app.route("/transactions/new", methods=["GET", "POST"])
def new_transaction():
    db = get_db()
    cur = db.cursor()
    if request.method == "POST":
        tx_date = request.form["txDate"]
        amount = float(request.form["amount"])
        iban = request.form["IBAN"]
        category_id = int(request.form["categoryID"])
        sub_id = request.form.get("subID") or None

        cur.execute("SELECT 1 FROM BankAccount WHERE IBAN = %s", (iban,))
        if not cur.fetchone():
            flash("Invalid account IBAN.", "error")
            cur.close()
            db.close()
            return redirect(url_for("new_transaction"))
        cur.execute("SELECT 1 FROM Category WHERE categoryID = %s", (category_id,))
        if not cur.fetchone():
            flash("Invalid category.", "error")
            cur.close()
            db.close()
            return redirect(url_for("new_transaction"))
        if sub_id:
            cur.execute("SELECT 1 FROM Subscription WHERE subID = %s", (sub_id,))
            if not cur.fetchone():
                flash("Invalid subscription.", "error")
                cur.close()
                db.close()
                return redirect(url_for("new_transaction"))

        cur.execute(
            "INSERT INTO `Transaction`(txDate, amount, IBAN, categoryID, subID) "
            "VALUES (%s, %s, %s, %s, %s)",
            (tx_date, amount, iban, category_id, sub_id),
        )
        db.commit()
        cur.close()
        db.close()
        flash("Transaction added successfully.", "success")
        return redirect(url_for("transactions"))

    cur.execute("SELECT IBAN, balance FROM BankAccount ORDER BY IBAN")
    accounts = cur.fetchall()
    cur.execute("SELECT categoryID, name FROM Category ORDER BY name")
    categories = cur.fetchall()
    cur.execute("SELECT subID, amount FROM Subscription ORDER BY subID")
    subscriptions = cur.fetchall()
    cur.close()
    db.close()
    return render_template(
        "transaction_form.html",
        mode="Create",
        action=url_for("new_transaction"),
        accounts=accounts,
        categories=categories,
        subscriptions=subscriptions,
        tx=None,
    )

# ---------------------------------------------------------------------------
# Transactions — Update (edit)
# ---------------------------------------------------------------------------
@app.route("/transactions/<int:tx_id>/edit", methods=["GET", "POST"])
def edit_transaction(tx_id):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM `Transaction` WHERE txNo = %s", (tx_id,))
    tx = cur.fetchone()
    if tx is None:
        cur.close()
        db.close()
        flash("Transaction not found.", "error")
        return redirect(url_for("transactions"))

    if request.method == "POST":
        tx_date = request.form["txDate"]
        amount = float(request.form["amount"])
        iban = request.form["IBAN"]
        category_id = int(request.form["categoryID"])
        sub_id = request.form.get("subID") or None

        cur.execute("SELECT 1 FROM BankAccount WHERE IBAN = %s", (iban,))
        if not cur.fetchone():
            flash("Invalid account IBAN.", "error")
            cur.close()
            db.close()
            return redirect(url_for("edit_transaction", tx_id=tx_id))
        cur.execute("SELECT 1 FROM Category WHERE categoryID = %s", (category_id,))
        if not cur.fetchone():
            flash("Invalid category.", "error")
            cur.close()
            db.close()
            return redirect(url_for("edit_transaction", tx_id=tx_id))
        if sub_id:
            cur.execute("SELECT 1 FROM Subscription WHERE subID = %s", (sub_id,))
            if not cur.fetchone():
                flash("Invalid subscription.", "error")
                cur.close()
                db.close()
                return redirect(url_for("edit_transaction", tx_id=tx_id))

        cur.execute(
            "UPDATE `Transaction` SET txDate=%s, amount=%s, IBAN=%s, categoryID=%s, subID=%s "
            "WHERE txNo=%s",
            (tx_date, amount, iban, category_id, sub_id, tx_id),
        )
        db.commit()
        cur.close()
        db.close()
        flash("Transaction updated successfully.", "success")
        return redirect(url_for("transactions"))

    cur.execute("SELECT IBAN, balance FROM BankAccount ORDER BY IBAN")
    accounts = cur.fetchall()
    cur.execute("SELECT categoryID, name FROM Category ORDER BY name")
    categories = cur.fetchall()
    cur.execute("SELECT subID, amount FROM Subscription ORDER BY subID")
    subscriptions = cur.fetchall()
    cur.close()
    db.close()
    return render_template(
        "transaction_form.html",
        mode="Edit",
        action=url_for("edit_transaction", tx_id=tx_id),
        accounts=accounts,
        categories=categories,
        subscriptions=subscriptions,
        tx=tx,
    )


# ---------------------------------------------------------------------------
# Transactions — Delete
# ---------------------------------------------------------------------------
@app.route("/transactions/<int:tx_id>/delete", methods=["POST"])
def delete_transaction(tx_id):
    db = get_db()
    cur = db.cursor()
    cur.execute("DELETE FROM `Transaction` WHERE txNo = %s", (tx_id,))
    db.commit()
    cur.close()
    db.close()
    flash("Transaction deleted successfully.", "success")
    return redirect(url_for("transactions"))


# ---------------------------------------------------------------------------
# Accounts — Read
# ---------------------------------------------------------------------------
@app.route("/accounts")
def accounts():
    db = get_db()
    cur = db.cursor()
    cur.execute(
        """
        SELECT ba.IBAN, ba.balance, b.bankName, u.email AS owner,
               CASE
                 WHEN EXISTS(SELECT 1 FROM Checking c WHERE c.IBAN = ba.IBAN) THEN 'Checking'
                 WHEN EXISTS(SELECT 1 FROM Savings s WHERE s.IBAN = ba.IBAN) THEN 'Savings'
                 WHEN EXISTS(SELECT 1 FROM CreditCard cc WHERE cc.IBAN = ba.IBAN) THEN 'Credit Card'
                 ELSE 'Account'
               END AS type
        FROM BankAccount ba
        JOIN Bank b ON b.bankID = ba.bankID
        JOIN `User` u ON u.userID = ba.userID
        ORDER BY ba.IBAN
        """
    )
    rows = cur.fetchall()
    cur.close()
    db.close()
    return render_template("accounts.html", accounts=rows)


# ---------------------------------------------------------------------------
# Accounts — Create (new)
# ---------------------------------------------------------------------------
@app.route("/accounts/new", methods=["GET", "POST"])
def new_account():
    db = get_db()
    cur = db.cursor()
    if request.method == "POST":
        iban = request.form["IBAN"].strip().upper()
        balance = float(request.form["balance"] or 0)
        bank_id = int(request.form["bankID"])
        user_id = int(request.form["userID"])
        acct_type = request.form["type"]

        cur.execute("SELECT 1 FROM Bank WHERE bankID = %s", (bank_id,))
        if not cur.fetchone():
            flash("Invalid bank.", "error")
            cur.close(); db.close()
            return redirect(url_for("new_account"))
        cur.execute("SELECT 1 FROM `User` WHERE userID = %s", (user_id,))
        if not cur.fetchone():
            flash("Invalid user.", "error")
            cur.close(); db.close()
            return redirect(url_for("new_account"))
        cur.execute("SELECT 1 FROM BankAccount WHERE IBAN = %s", (iban,))
        if cur.fetchone():
            flash("Account with this IBAN already exists.", "error")
            cur.close(); db.close()
            return redirect(url_for("new_account"))

        try:
            cur.execute(
                "INSERT INTO BankAccount(IBAN, balance, bankID, userID) VALUES (%s, %s, %s, %s)",
                (iban, balance, bank_id, user_id),
            )
            if acct_type == "checking":
                cur.execute("INSERT INTO Checking(IBAN) VALUES (%s)", (iban,))
            elif acct_type == "savings":
                cur.execute("INSERT INTO Savings(IBAN, interestRate) VALUES (%s, %s)", (iban, 0.015))
            elif acct_type == "creditcard":
                cur.execute("INSERT INTO CreditCard(IBAN, creditLimit) VALUES (%s, %s)", (iban, 5000.00))
            db.commit()
            flash("Account created successfully.", "success")
        except Exception as e:
            db.rollback()
            flash(f"Error creating account: {e}", "error")
        finally:
            cur.close(); db.close()
        return redirect(url_for("accounts"))

    cur.execute("SELECT bankID, bankName FROM Bank ORDER BY bankName")
    banks = cur.fetchall()
    cur.execute("SELECT userID, email FROM `User` ORDER BY email")
    users = cur.fetchall()
    cur.close(); db.close()
    return render_template("account_form.html", mode="Create", action=url_for("new_account"),
                           banks=banks, users=users, account=None)


# ---------------------------------------------------------------------------
# Accounts — Update (edit)
# ---------------------------------------------------------------------------
@app.route("/accounts/<iban>/edit", methods=["GET", "POST"])
def edit_account(iban):
    db = get_db()
    cur = db.cursor()
    cur.execute(
        """
        SELECT ba.IBAN, ba.balance, b.bankName, u.email AS owner, ba.bankID, ba.userID,
               CASE
                 WHEN EXISTS(SELECT 1 FROM Checking c WHERE c.IBAN = ba.IBAN) THEN 'checking'
                 WHEN EXISTS(SELECT 1 FROM Savings s WHERE s.IBAN = ba.IBAN) THEN 'savings'
                 WHEN EXISTS(SELECT 1 FROM CreditCard cc WHERE cc.IBAN = ba.IBAN) THEN 'creditcard'
                 ELSE 'checking'
               END AS type
        FROM BankAccount ba
        JOIN Bank b ON b.bankID = ba.bankID
        JOIN `User` u ON u.userID = ba.userID
        WHERE ba.IBAN = %s
        """,
        (iban,),
    )
    account = cur.fetchone()
    if account is None:
        cur.close(); db.close()
        flash("Account not found.", "error")
        return redirect(url_for("accounts"))

    if request.method == "POST":
        balance = float(request.form["balance"] or 0)
        bank_id = int(request.form["bankID"])
        user_id = int(request.form["userID"])
        acct_type = request.form["type"]

        cur.execute("UPDATE BankAccount SET balance=%s, bankID=%s, userID=%s WHERE IBAN=%s",
                    (balance, bank_id, user_id, iban))
        if acct_type == "checking":
            cur.execute("DELETE FROM Savings WHERE IBAN=%s", (iban,))
            cur.execute("DELETE FROM CreditCard WHERE IBAN=%s", (iban,))
            cur.execute("INSERT IGNORE INTO Checking(IBAN) VALUES (%s)", (iban,))
        elif acct_type == "savings":
            cur.execute("DELETE FROM Checking WHERE IBAN=%s", (iban,))
            cur.execute("DELETE FROM CreditCard WHERE IBAN=%s", (iban,))
            cur.execute("INSERT IGNORE INTO Savings(IBAN, interestRate) VALUES (%s, %s)", (iban, 0.015))
        elif acct_type == "creditcard":
            cur.execute("DELETE FROM Checking WHERE IBAN=%s", (iban,))
            cur.execute("DELETE FROM Savings WHERE IBAN=%s", (iban,))
            cur.execute("INSERT IGNORE INTO CreditCard(IBAN, creditLimit) VALUES (%s, %s)", (iban, 5000.00))
        db.commit()
        cur.close(); db.close()
        flash("Account updated successfully.", "success")
        return redirect(url_for("accounts"))

    cur.execute("SELECT bankID, bankName FROM Bank ORDER BY bankName")
    banks = cur.fetchall()
    cur.execute("SELECT userID, email FROM `User` ORDER BY email")
    users = cur.fetchall()
    cur.close(); db.close()
    return render_template("account_form.html", mode="Edit",
                           action=url_for("edit_account", iban=iban),
                           banks=banks, users=users, account=account)


# ---------------------------------------------------------------------------
# Accounts — Delete
# ---------------------------------------------------------------------------
@app.route("/accounts/<iban>/delete", methods=["POST"])
def delete_account(iban):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT COUNT(*) AS c FROM `Transaction` WHERE IBAN = %s", (iban,))
    if cur.fetchone()["c"] > 0:
        cur.close(); db.close()
        flash("Cannot delete account with existing transactions. Remove transactions first.", "error")
        return redirect(url_for("accounts"))
    cur.execute("DELETE FROM BankAccount WHERE IBAN = %s", (iban,))
    db.commit()
    cur.close(); db.close()
    flash("Account deleted successfully.", "success")
    return redirect(url_for("accounts"))


# ---------------------------------------------------------------------------
# Budgets — Read (budget vs actual)
# ---------------------------------------------------------------------------
@app.route("/budgets")
def budgets():
    db = get_db()
    cur = db.cursor()
    cur.execute(
        """
        SELECT c.name AS category, b.limitAmount,
               COALESCE(SUM(t.amount), 0) AS spent,
               (b.limitAmount - COALESCE(SUM(t.amount), 0)) AS remaining,
               CASE WHEN COALESCE(SUM(t.amount), 0) > b.limitAmount THEN 1 ELSE 0 END AS is_over
        FROM Budget b
        JOIN Category c ON c.categoryID = b.categoryID
        LEFT JOIN `Transaction` t
          ON t.categoryID = c.categoryID
         AND DATE_FORMAT(t.txDate, '%Y-%m') = SUBSTRING(b.month, 1, 7)
        WHERE b.userID = 1 AND b.month = (SELECT MAX(month) FROM Budget WHERE userID = 1)
        GROUP BY b.budgetID, c.name, b.limitAmount
        ORDER BY c.name
        """
    )
    rows = cur.fetchall()
    cur.close()
    db.close()
    return render_template("budgets.html", budgets=rows)


# ---------------------------------------------------------------------------
# Subscriptions — Read
# ---------------------------------------------------------------------------
@app.route("/subscriptions")
def subscriptions():
    db = get_db()
    cur = db.cursor()
    cur.execute(
        """
        SELECT s.subID, s.amount, s.billingCycle, s.yearlyCost, u.email AS owner, s.IBAN
        FROM Subscription s
        JOIN `User` u ON u.userID = s.userID
        ORDER BY s.subID
        """
    )
    rows = cur.fetchall()
    cur.close()
    db.close()
    return render_template("subscriptions.html", subscriptions=rows)


# ---------------------------------------------------------------------------
# Categories — Read
# ---------------------------------------------------------------------------
@app.route("/categories")
def categories():
    db = get_db()
    cur = db.cursor()
    cur.execute(
        """
        SELECT c.categoryID, c.name,
               COUNT(t.txNo) AS tx_count,
               COALESCE(SUM(t.amount), 0) AS total_spent
        FROM Category c
        LEFT JOIN `Transaction` t ON t.categoryID = c.categoryID
        GROUP BY c.categoryID, c.name
        ORDER BY c.name
        """
    )
    rows = cur.fetchall()
    cur.close()
    db.close()
    return render_template("categories.html", categories=rows)

