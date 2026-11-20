# What changed and why

A summary of the front-end redesign and the backend fixes, so the whole group knows
what's different from the previous version.

## Front end (`templates/`, `static/style.css`)
- New minimal banking design (Revolut / N26 style) in the existing navy `#26336D` and blue `#3B82F6`.
- Home: total balance, scrollable account cards, a "spent so far this month vs last month" chart,
  budgets, recent transactions grouped by day, spending per category.
- Transactions grouped by day with category icons; filters for account, category and month.
- Forms: "Money out / Money in" switch with a positive amount (no more typing minus signs),
  account form shows interest rate or credit limit depending on the type.
- Delete buttons moved to the edit pages, with a confirmation.
- Mobile: bottom tab bar like a banking app.
- Chart.js upgraded from 2.9.4 to 4.4.1. The old chart options were written for v3+,
  so v2 ignored them (horizontal bar chart, legends).
- Font: Manrope from Google Fonts. The two PolySans `.otf` files in `static/fonts/` were not
  fonts (they contain the text "No Content: https://public-assets.envato-static.com/...") and
  PolySans is a commercial font, so they can be deleted.

## `schema.sql`
| Change | Why |
|---|---|
| `Transaction` key is now `(IBAN, txNo)` instead of a global `AUTO_INCREMENT txNo` | The ER diagram draws Transaction as a weak entity of BankAccount (double box, double diamond `records`). Its key must include the owner's key. |
| `Subscription.yearlyCost` removed, new view `SubscriptionCost` computes it | `yearlyCost` is a derived attribute (dashed oval), so it shouldn't be stored. |
| `Subscription.serviceName` added | So the UI shows "Spotify" instead of "Subscription #1234". |
| `Transaction.categoryID` nullable, `ON DELETE SET NULL` | `categorized` is partial participation in the ER diagram. |
| `Transaction.subID` `ON DELETE SET NULL` (was `CASCADE`) | Deleting a subscription used to delete all its past payments. |
| `Bank` FK on `BankAccount` no longer cascades | Deleting a bank shouldn't silently delete everyone's accounts. |
| `Budget`: `UNIQUE(userID, categoryID, month)`, `month CHAR(7)` | One budget per category per month. |
| `interestRate`, `creditLimit` `NOT NULL` | Every savings account has a rate, every card a limit. |

## `init_db.py`
| Change | Why |
|---|---|
| Kaggle amounts stored as negative | They are card purchases (money out). Before, every expense showed as green "+" income. |
| Dates spread over the 10 years before today (was: +7 years, all in 1-7 Jan 2026) | Budgets are for the current month, but all transactions were in January, so every budget showed $0 spent. |
| Budgets created for this month and the 3 before it (was a fixed `2026-11`) | Works on whatever day the marker runs it. |
| Card payments only from checking accounts and the credit card | Before, purchases were also paid from savings accounts. |
| Credit card balances negative | `-(x) % 1500` in Python is positive, so cards showed positive balances. |
| More categories (Shopping, Health & Personal Care, Travel, Subscriptions, Income) | 62% of payments landed in "General & Other". |
| Synthetic salary, rent, utility bills; 14 named subscriptions with monthly payments | The Kaggle data has no income or bills; `subscriptions.csv` has 3,069 identical $39 rows without names. Subscription payments now actually use `pays_for` (`subID`). |
| `txNo` numbered 1, 2, 3 ... per account | Weak entity partial key. |

## `app.py`
| Change | Why |
|---|---|
| Add / edit / delete transaction also updates `BankAccount.balance`, in one SQL transaction (`FOR UPDATE` lock) | Balances never changed before. |
| Every page is filtered by the current user; user menu in the header | Totals mixed all 3 users, and "budget vs actual" summed everyone's spending against user 1's budget. |
| Transaction routes take `<IBAN>/<txNo>` | New composite key. |
| Users can only see and edit their own accounts and transactions | Checked in every write route. |
| Account form saves interest rate and credit limit from the form | They were hard-coded to 1.5 % and $5,000. Credit cards take "amount owed". |
| Budgets and categories pages can switch month | Uses `?month=YYYY-MM`. |
| Month filters use `txDate >= start AND txDate < end` instead of `DATE_FORMAT(...) = ...` | Can use the date index, and is a nicer statement to explain. |
| Money formatted with thousands separators (`$684,134.86`, not `$684134.86`) | Jinja filters `money` and `usd`. |

## `requirements.txt`
- Added `cryptography`. MySQL 8 uses `caching_sha2_password` by default, and pymysql needs this
  package to log in with it. Without it the marker gets an error on the first connection.
