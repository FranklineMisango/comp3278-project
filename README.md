# COMP3278 Final Project: Financial Tracker

A personal finance web app built with **Flask** and **MySQL 8.x**. You can see the
balance of all your bank accounts, track spending against monthly budgets, keep an
eye on subscriptions, and add, edit and delete transactions and accounts (full CRUD).
The database is populated with card payment data from Kaggle.

## Repository contents

| File / folder | Purpose |
|---|---|
| `app.py` | Flask web application (routes, CRUD, MySQL queries) |
| `schema.sql` | MySQL schema (ER diagram reduced to tables) |
| `init_db.py` | Builds and populates the MySQL `financial_tracker` database |
| `requirements.txt` | Python dependencies |
| `static/style.css` | Stylesheet |
| `templates/` | Jinja2 HTML templates (`_macros.html` holds shared pieces like the transaction row) |
| `processed_financial_data/` | Kaggle-derived CSVs: `transactions.csv`, `budget_benchmarks.csv`, `subscriptions.csv` |
| `app_er_digram.jpeg` | Entity-relationship diagram |
| `downloader.py` | Original Kaggle download/processing script |
| `class-guide/` | Tutorial and assessment criteria PDFs |

## 1. Installation and run instructions

### Prerequisites
- Python 3.8+ (tested on Python 3.12 and 3.13)
- MySQL 8.x server running (see section 2)
- `pip`
- An internet connection in the browser (the font and Chart.js load from a CDN)

### Steps
```bash
# 1. Open the project folder
cd comp3278-project

# 2. Create a virtual environment and install dependencies
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# 3. Set up the MySQL user and database (section 2), then load the data
python init_db.py

# 4. Run the application
flask --app app run --debug --port 5050
```

The app is available at **http://127.0.0.1:5050/**. Stop it with Ctrl+C.

Port 5050 is used because on macOS the AirPlay Receiver already takes Flask's default
port 5000. On Windows or Linux you can leave out `--port 5050` and open http://127.0.0.1:5000/.

Next time, you only need to activate the virtual environment and run the `flask` command again.

Use the menu in the top-right corner to switch between the three demo users
(alice, bob, carol). Every page shows only the selected user's data.

## 2. Database setup, configuration and initial data

### MySQL server
The app connects to MySQL as user `finance_app` on `localhost`, database `financial_tracker`.
Create the user once (as a MySQL admin, e.g. `sudo mysql -u root` or `mysql -u root -p`):

```sql
CREATE DATABASE IF NOT EXISTS financial_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'finance_app'@'localhost' IDENTIFIED BY 'finance_app_2026';
GRANT ALL PRIVILEGES ON financial_tracker.* TO 'finance_app'@'localhost';
FLUSH PRIVILEGES;
```

The connection settings are at the top of `app.py` and `init_db.py` (`DB_CONFIG`).

### Schema
`schema.sql` defines 10 tables and 1 view (`ENGINE=InnoDB`, `utf8mb4`):

| ER element | Table / constraint |
|---|---|
| Bank, User, Category | `Bank`, `User`, `Category` |
| BankAccount + `held_at` + `owns` | `BankAccount` with `bankID NOT NULL` and `userID NOT NULL` (many-to-one, total participation) |
| ISA (disjoint): Checking, Savings, CreditCard | `Checking`, `Savings`, `CreditCard`, each keyed by `IBAN` referencing `BankAccount` |
| Transaction (weak entity) + `records` | `Transaction` with primary key `(IBAN, txNo)`: owner key + partial key |
| `categorized`, `pays_for` (partial participation) | `Transaction.categoryID` and `Transaction.subID`, both nullable |
| Subscription + `subscribes` + `charged_to` | `Subscription` with `userID NOT NULL`, `IBAN NOT NULL` |
| `yearlyCost` (derived attribute) | Not stored. The view `SubscriptionCost` computes it from `amount` and `billingCycle` |
| Budget + `limits` + `sets` | `Budget` with `categoryID NOT NULL`, `userID NOT NULL`, `UNIQUE(userID, categoryID, month)` |

Amounts are signed: negative = money out, positive = money in.
A negative balance on a credit card is the amount owed.

### Loading the data
```bash
python init_db.py
```
This drops and recreates all tables, then loads:
- 4 banks, 3 users, 27 bank accounts (per user: a checking and a savings account at each bank, plus a credit card)
- 11 categories: the 5 from `budget_benchmarks.csv`, plus groups for the other Kaggle categories, Subscriptions and Income
- Monthly budgets from `budget_benchmarks.csv` for the current month and the 3 months before it
- 14 named subscriptions (Spotify, Netflix, ...)
- About 12,400 transactions: the 10,000 Kaggle card payments, plus synthetic monthly salary, rent, utility bills and subscription payments

Re-run it any time to reset the database.

### Data source, synthesis and acknowledgement
Card payments come from Kaggle via `downloader.py` (`processed_financial_data/transactions.csv`,
© the respective Kaggle authors). Amounts and categories are kept as sourced; amounts are stored
as negative numbers because they are money going out. Two things are synthesized:
- **Dates.** The Kaggle payments all fall in the first week of January 2019. `init_db.py` spreads
  them over the 10 years before the day you run it, so the current month always has data.
- **Recurring items.** Salary, rent, utility bills and subscriptions are generated, because the
  Kaggle data only has card purchases. `subscriptions.csv` is not loaded: it holds 3,069 identical
  $39/month rows with numeric IDs instead of service names (the $39 gym membership comes from it).

## 3. Application features (CRUD)

| Feature | Route | Operation |
|---|---|---|
| Home: total balance, accounts, spending chart, budgets, recent activity | `/` | Read |
| List transactions (by day, filter by account / category / month, paginated) | `/transactions` | Read |
| Add a transaction | `/transactions/new` | **Create** |
| Edit a transaction | `/transactions/<IBAN>/<txNo>/edit` | **Update** |
| Delete a transaction | `/transactions/<IBAN>/<txNo>/delete` | **Delete** |
| Accounts, grouped by type | `/accounts` | Read |
| Add an account | `/accounts/new` | **Create** |
| Edit an account (also change its type) | `/accounts/<IBAN>/edit` | **Update** |
| Delete an account (only if it has no transactions) | `/accounts/<IBAN>/delete` | **Delete** |
| Budget vs actual, any month | `/budgets?month=YYYY-MM` | Read |
| Subscriptions with yearly cost | `/subscriptions` | Read |
| Spending per category, any month | `/categories?month=YYYY-MM` | Read |

Adding, editing or deleting a transaction also updates the account balance, in the same SQL
transaction. All SQL uses parameters (`%s`), never string formatting, to prevent SQL injection.

## 4. How to test the application

### 4.1 Start from fresh data
```bash
python init_db.py
flask --app app run --debug --port 5050
```
Open http://127.0.0.1:5050/ and check that the user menu (top right) shows **alice@example.com**.
The steps below use alice's Chase Bank checking account, `US000000000000000001`, which always
starts with a balance of **$1,637.00** after `init_db.py`.

### 4.2 Every page loads
| Open | You should see |
|---|---|
| Home `/` | Total balance, 9 account cards, the "Spent in ..." chart (this month vs last month), budgets, recent transactions |
| Transactions `/transactions` | Transactions grouped by day, newest first. Expenses have a minus sign; salary is green with a plus |
| Accounts `/accounts` | 4 checking, 4 savings and 1 credit card, grouped by type |
| Budgets `/budgets` | 6 budgets for this month. The arrows switch month; budgets that are over turn red |
| Subscriptions `/subscriptions` | Named subscriptions with a yearly cost for each |
| Categories `/categories` | Spending per category for this month |

### 4.3 Transactions: create, update, delete
Each step changes the account balance, which shows the SQL transaction worked.

| # | Do | Expected result |
|---|---|---|
| 1 | Transactions, then **Add transaction**. Money out, amount `25`, account *Chase Bank checking ••0001*, category *Food & Groceries*. Click **Add transaction** | Message "Transaction added". The new payment is at the top under *Today*. Accounts shows Chase ••0001 at **$1,612.00** |
| 2 | Click that transaction, change the amount to `40`, **Save changes** | "Transaction updated". Balance is **$1,597.00** |
| 3 | Open it again, switch to **Money in**, **Save changes** | The amount turns green with a plus. Balance is **$1,677.00** |
| 4 | Open it again, **Delete**, confirm | "Transaction deleted". Balance is back to **$1,637.00** |
| 5 | Add transaction, pick *Spotify* under "Pays for a subscription" | The category switches to *Subscriptions* automatically. After saving, the row is titled "Spotify" |

### 4.4 Accounts: create, update, delete
| # | Do | Expected result |
|---|---|---|
| 1 | Accounts, then **Add account**. Type *Savings*, IBAN `US99 1234 5678 9012`, any bank, balance `1000`, interest rate `2.5`. Click **Add account** | "Account added". The account appears under Savings with "2.50% interest a year" |
| 2 | Open it and change the type to *Credit card*, limit `3000`, owed `120`. **Save changes** | It moves to Credit cards, showing $120.00 owed of a $3,000.00 limit |
| 3 | Open it and click **Delete**, confirm | "Account deleted" and it's gone |
| 4 | Open Chase ••0001 | **Delete** is greyed out, because the account has transactions |

### 4.5 Input checks and per-user data
| Do | Expected result |
|---|---|
| Add account with IBAN `hello` | Error: "That IBAN doesn't look right..." |
| Add account with IBAN `US000000000000000001` | Error: "An account with this IBAN already exists." |
| Add transaction with amount `0` | The browser blocks it (the amount must be at least 0.01) |
| Switch the user menu to **bob** | Different balance and accounts. None of alice's data is shown |
| As bob, open http://127.0.0.1:5050/transactions/US000000000000000001/1/edit (alice's transaction) | Redirected with "Transaction not found." |
| Make the browser window narrow (or use phone view in the browser's developer tools) | The menu moves to a tab bar at the bottom of the screen |

### 4.6 Check the results in MySQL
Log in with `mysql -u finance_app -p financial_tracker` (password `finance_app_2026`):
```sql
-- Balance after the steps in 4.3 (expected: 1637.00 once the test transaction is deleted)
SELECT balance FROM BankAccount WHERE IBAN = 'US000000000000000001';

-- Latest transactions of that account; txNo counts up per account (weak entity)
SELECT * FROM `Transaction` WHERE IBAN = 'US000000000000000001' ORDER BY txNo DESC LIMIT 5;

-- ISA check: every account is in exactly one subtype table (expected: no rows)
SELECT ba.IBAN FROM BankAccount ba
WHERE (SELECT COUNT(*) FROM Checking   c  WHERE c.IBAN  = ba.IBAN)
    + (SELECT COUNT(*) FROM Savings    s  WHERE s.IBAN  = ba.IBAN)
    + (SELECT COUNT(*) FROM CreditCard cc WHERE cc.IBAN = ba.IBAN) <> 1;

-- Derived attribute yearlyCost
SELECT serviceName, amount, billingCycle, yearlyCost FROM SubscriptionCost WHERE userID = 1;
```

Run `python init_db.py` again afterwards to reset all data.

### 4.7 Troubleshooting
| Problem | Fix |
|---|---|
| `Access denied for user 'finance_app'@'localhost'` | Create the MySQL user (section 2) |
| `'cryptography' package is required for sha256_password or caching_sha2_password` | `pip install -r requirements.txt` (it includes `cryptography`) |
| `Can't connect to MySQL server on 'localhost'` | Start MySQL. macOS with Homebrew: `brew services start mysql`. Windows: start the MySQL80 service |
| `error: externally-managed-environment` when running pip | Use the virtual environment from section 1 |
| `Address already in use`, or a blank 403 page on port 5000 (macOS) | Run with `--port 5050` |
| No budgets for this month | The demo data is dated relative to the day `init_db.py` ran. Run it again |
| Chart or font missing | Both load from the internet (jsDelivr, Google Fonts). Check the connection |

## 5. Key SQL statements

**Create a transaction** (weak entity: the next `txNo` is counted per account; the balance is
updated in the same SQL transaction, so balance and history always agree):
```sql
START TRANSACTION;
SELECT balance FROM BankAccount WHERE IBAN = %s FOR UPDATE;
SELECT COALESCE(MAX(txNo), 0) + 1 AS nextNo FROM `Transaction` WHERE IBAN = %s;
INSERT INTO `Transaction`(IBAN, txNo, txDate, amount, categoryID, subID)
VALUES (%s, %s, %s, %s, %s, %s);
UPDATE BankAccount SET balance = balance + %s WHERE IBAN = %s;
COMMIT;
```

**Update** (the balance changes by the difference between new and old amount):
```sql
UPDATE `Transaction` SET txDate = %s, amount = %s, categoryID = %s, subID = %s
WHERE IBAN = %s AND txNo = %s;
UPDATE BankAccount SET balance = balance + %s - %s WHERE IBAN = %s;   -- new, old
```

**Delete:**
```sql
DELETE FROM `Transaction` WHERE IBAN = %s AND txNo = %s;
UPDATE BankAccount SET balance = balance - %s WHERE IBAN = %s;
```

**Create an account (ISA):** one row in `BankAccount` plus one row in exactly one subtype table,
in a single SQL transaction:
```sql
INSERT INTO BankAccount(IBAN, balance, bankID, userID) VALUES (%s, %s, %s, %s);
INSERT INTO Savings(IBAN, interestRate) VALUES (%s, %s);   -- or Checking / CreditCard
```

**Account type from the ISA tables:**
```sql
SELECT ba.IBAN, ba.balance, b.bankName,
       CASE WHEN c.IBAN  IS NOT NULL THEN 'checking'
            WHEN s.IBAN  IS NOT NULL THEN 'savings'
            WHEN cc.IBAN IS NOT NULL THEN 'creditcard' END AS type
FROM BankAccount ba
JOIN Bank b             ON b.bankID = ba.bankID
LEFT JOIN Checking c    ON c.IBAN  = ba.IBAN
LEFT JOIN Savings s     ON s.IBAN  = ba.IBAN
LEFT JOIN CreditCard cc ON cc.IBAN = ba.IBAN
WHERE ba.userID = %s;
```

**Budget vs actual** for one user and month (spending summed over all of the user's accounts):
```sql
SELECT c.name AS category, b.limitAmount, COALESCE(s.spent, 0) AS spent
FROM Budget b
JOIN Category c ON c.categoryID = b.categoryID
LEFT JOIN (
    SELECT t.categoryID, -SUM(t.amount) AS spent
    FROM `Transaction` t
    JOIN BankAccount ba ON ba.IBAN = t.IBAN
    WHERE ba.userID = %s AND t.amount < 0
      AND t.txDate >= %s AND t.txDate < %s          -- first day of month, first day of next month
    GROUP BY t.categoryID
) s ON s.categoryID = b.categoryID
WHERE b.userID = %s AND b.month = %s;
```

**Derived attribute `yearlyCost`** (view):
```sql
CREATE VIEW SubscriptionCost AS
SELECT s.*, ROUND(s.amount * CASE s.billingCycle WHEN 'weekly' THEN 52 WHEN 'monthly' THEN 12
                                                 WHEN 'quarterly' THEN 4 ELSE 1 END, 2) AS yearlyCost
FROM Subscription s;
```

## 6. Presentation / assessment notes

- **ER diagram**: see `app_er_digram.jpeg`. The table in section 2 maps every ER element to the schema.
- **CRUD video (max 2 minutes)**, suggested order:
  1. Home: point at the balance of one account.
  2. Add a transaction (money out) on that account, show it in Transactions and the lower balance.
  3. Edit it (change the amount), show the balance change.
  4. Delete it, show the balance is back.
  5. Add an account, change its type to credit card, delete it.
  6. Quick look at Budgets (switch month), Subscriptions and Categories.

## 7. Assumptions and adaptations
- MySQL 8.x is the database (per requirement). Tested with strict SQL mode (`ONLY_FULL_GROUP_BY`).
- `Transaction` is a weak entity, as in the ER diagram: key `(IBAN, txNo)`, with `txNo` numbered per account.
  Because the account is part of the key, a transaction can't be moved to another account.
- `yearlyCost` is derived, so it's computed in a view instead of stored.
- `Subscription.serviceName` was added so the UI can show names (not in the ER diagram).
- `categoryID` and `subID` on `Transaction` are nullable (partial participation).
- Deleting a subscription keeps its past payments (`ON DELETE SET NULL`).
- Accounts with transactions can't be deleted from the UI, so history is never removed by accident.
- There is no login: the user menu switches between demo users, since `User` only has an email.
- UI: Manrope font (Google Fonts), Chart.js 4, tabular numbers for money, + and − signs on
  amounts (colour is never the only cue), mobile layout with a bottom tab bar.
