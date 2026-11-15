# COMP3278 Final Project — Financial Tracker

A personal financial tracking web application built with **Flask** and **MySQL 8.x**.
It lets users track spending across accounts, compare actual spend against monthly
budgets, manage recurring subscriptions, and perform full **CRUD** operations on
transactions — all backed by a relational database populated with Kaggle data.

## Repository contents

| File / folder | Purpose |
|---|---|
| `app.py` | Flask web application (routes, CRUD, MySQL queries) |
| `schema.sql` | MySQL relational schema (ER diagram reduced to tables) |
| `init_db.py` | Builds + populates the MySQL `financial_tracker` database |
| `requirements.txt` | Python dependencies |
| `static/style.css` | Self-contained fintech design system stylesheet |
| `templates/` | Jinja2 HTML templates (dashboard, transactions, accounts, budgets, subscriptions, categories) |
| `processed_financial_data/` | Kaggle-derived CSVs: `transactions.csv`, `budget_benchmarks.csv`, `subscriptions.csv` |
| `app_er_digram.jpeg` | Entity–Relationship diagram |
| `downloader.py` | Original Kaggle download/processing script |
| `class-guide/` | Tutorial & assessment criteria PDFs |

## 1. Installation & run instructions

### Prerequisites
- Python 3.8+ (tested on Python 3.12)
- MySQL 8.x server running (see section 2)
- `pip`

### Steps
```bash
# 1. Open this folder
cd /home/misango/codechest/comp3278-project

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up the MySQL database (see section 2)
python init_db.py

# 4. Run the application
flask --app app run --debug
```

The app will be available at **http://127.0.0.1:5000/**.

## 2. Database setup, configuration & initial data

### MySQL server
The app connects to MySQL as user `finance_app` on `localhost` database `financial_tracker`.
Set it up once (run as a MySQL admin, e.g. via `sudo mysql -u root`):

```sql
CREATE DATABASE IF NOT EXISTS financial_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'finance_app'@'localhost' IDENTIFIED BY 'finance_app_2026';
GRANT ALL PRIVILEGES ON financial_tracker.* TO 'finance_app'@'localhost';
FLUSH PRIVILEGES;
```

### Schema
`schema.sql` defines 9 tables for MySQL 8.x (`ENGINE=InnoDB`, `utf8mb4`):
- **Core**: `Bank`, `User`
- **BankAccount (ISA supertype)** with disjoint subtypes `Checking`, `Savings`, `CreditCard`
- `Category`, `Subscription`, `Budget`, `Transaction`

Foreign keys are inlined on child entities per the ER diagram.

### Data source
Initial data comes from Kaggle via `downloader.py` and lives in
`processed_financial_data/`:
- `transactions.csv` — 10,000 card transactions (date, amount, category, source IBAN)
- `budget_benchmarks.csv` — monthly budget limits per category
- `subscriptions.csv` — recurring subscription amounts/costs

**Data synthesis & acknowledgement:** The raw Kaggle transaction dates are from 2019.
`init_db.py` synthesizes them forward by +7 years (2019 → **2026**) so the dashboard
reflects a current dataset. Original transaction data is © its respective Kaggle
authors and is acknowledged here; only dates were shifted — amounts and categories
are preserved as sourced.

### Loading the data
```bash
python init_db.py
```
This creates all tables from `schema.sql` and loads/transforms the Kaggle CSVs:
4 banks, 3 users, 27 bank accounts, 6 categories (5 benchmark + "General & Other"),
6 monthly budgets (user 1), 3,069 subscriptions charged to credit-card accounts,
and 10,000 transactions each mapped to a category and a real account
(`subID` is NULL for general spending — the `pays_for` relationship is optional).
Re-run anytime to reset to the seeded state.

## 3. Application features (CRUD)

| Feature | Route | Operation |
|---|---|---|
| Dashboard | `/` | Read |
| List transactions (paginated, category filter) | `/transactions` | Read |
| Add a transaction | `/transactions/new` | **Create** |
| Edit a transaction | `/transactions/<id>/edit` | **Update** |
| Delete a transaction | `/transactions/<id>/delete` | **Delete** |
| **Add an account** | `/accounts/new` | **Create** |
| **Edit an account** | `/accounts/<iban>/edit` | **Update** |
| **Delete an account** | `/accounts/<iban>/delete` | **Delete** |
| Accounts & balances | `/accounts` | Read |
| Budget vs actual | `/budgets` | Read |
| Subscriptions | `/subscriptions` | Read |
| Categories & totals | `/categories` | Read |

All writes use parameterized SQL (no string interpolation) to prevent SQL
injection, and foreign-key constraints keep data consistent.

## 4. Key SQL statements used by the app

Insert (Create):
```sql
INSERT INTO `Transaction`(txDate, amount, IBAN, categoryID, subID)
VALUES (%s, %s, %s, %s, %s);
```
Read (with category + account join):
```sql
SELECT t.txNo, t.txDate, t.amount, c.name AS category, ba.IBAN
FROM `Transaction` t
JOIN Category c ON c.categoryID = t.categoryID
JOIN BankAccount ba ON ba.IBAN = t.IBAN
ORDER BY t.txDate DESC, t.txNo DESC
LIMIT %s OFFSET %s;
```
Update:
```sql
UPDATE `Transaction` SET txDate=%s, amount=%s, IBAN=%s, categoryID=%s, subID=%s
WHERE txNo=%s;
```
Delete:
```sql
DELETE FROM `Transaction` WHERE txNo=%s;
```
Budget vs actual:
```sql
SELECT c.name, b.limitAmount, COALESCE(SUM(t.amount),0) AS spent,
       (b.limitAmount - COALESCE(SUM(t.amount),0)) AS remaining
FROM Budget b
JOIN Category c ON c.categoryID=b.categoryID
LEFT JOIN `Transaction` t ON t.categoryID=c.categoryID
   AND DATE_FORMAT(t.txDate,'%Y-%m')=SUBSTRING(b.month,1,7)
WHERE b.userID=1 AND b.month=(SELECT MAX(month) FROM Budget WHERE userID=1)
GROUP BY b.budgetID, c.name, b.limitAmount;
```

## 5. Presentation / assessment notes

- **ER diagram**: see `app_er_digram.jpeg`. `BankAccount` is the ISA supertype
  with disjoint subtypes `Checking`/`Savings`/`CreditCard`; `Transaction` links
  to an account (`records`), a category (`categorized`), and optionally a
  subscription (`pays_for`, nullable `subID`).
- A 2-minute (max) CRUD video: walk through **Add → Edit → Delete** on
  `/transactions`, plus read-only views (`/accounts`, `/budgets`, `/subscriptions`).

## 6. Assumptions & adaptations
- MySQL 8.x used as the relational database (per requirement).
- `Transaction.subID` made `NULL`able (a transaction is not always a subscription payment).
- `schema.sql` uses MySQL syntax (backticks, `AUTO_INCREMENT`, `ENGINE=InnoDB`).
- Kaggle transaction category strings are mapped to the 6 app categories;
  `subID` is `NULL` for general spending because the source data has no subscription link.
- Transaction dates synthesized 2019 → 2026 (see Data synthesis & acknowledgement above).
- UI/UX: PolySans typography (adapted from `public_theme/assets/PolySans-Family`),
  tabular numerals for currency, bento-grid dashboard, Chart.js doughnut chart,
  budget progress bars, Quick Add FAB, empty states, and +/- sign indicators
  (not color alone).
- Full CRUD for both transactions and accounts (add/edit/delete).

