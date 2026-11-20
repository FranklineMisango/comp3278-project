-- ============================================================================
-- Financial Tracker schema (MySQL 8.x)
-- Reduced from the ER diagram (app_er_digram.jpeg).
-- Each table / constraint says which ER element it comes from.
-- ============================================================================

DROP VIEW  IF EXISTS SubscriptionCost;
DROP TABLE IF EXISTS `Transaction`;
DROP TABLE IF EXISTS Budget;
DROP TABLE IF EXISTS Subscription;
DROP TABLE IF EXISTS CreditCard;
DROP TABLE IF EXISTS Savings;
DROP TABLE IF EXISTS Checking;
DROP TABLE IF EXISTS BankAccount;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS Bank;

-- ============================================================================
-- Core entities
-- ============================================================================

CREATE TABLE Bank (
    bankID    INT          PRIMARY KEY AUTO_INCREMENT,
    bankName  VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `User` (
    userID INT          PRIMARY KEY AUTO_INCREMENT,
    email  VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- BankAccount: supertype of the ISA hierarchy
--   held_at : many-to-one, total participation -> bankID NOT NULL
--   owns    : many-to-one, total participation -> userID NOT NULL
--   balance < 0 on a credit card means money owed
CREATE TABLE BankAccount (
    IBAN     VARCHAR(50)   PRIMARY KEY,
    balance  DECIMAL(15,2) NOT NULL DEFAULT 0,
    bankID   INT           NOT NULL,
    userID   INT           NOT NULL,
    FOREIGN KEY (bankID) REFERENCES Bank(bankID),
    FOREIGN KEY (userID) REFERENCES `User`(userID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ISA subtypes (disjoint): one table per subtype, keyed by the supertype key.
-- The app writes the supertype row and exactly one subtype row in one SQL
-- transaction, so every account is in exactly one subtype.
CREATE TABLE Checking (
    IBAN VARCHAR(50) PRIMARY KEY,
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Savings (
    IBAN         VARCHAR(50)  PRIMARY KEY,
    interestRate DECIMAL(5,4) NOT NULL,          -- 0.0150 = 1.5 % per year
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CreditCard (
    IBAN        VARCHAR(50)   PRIMARY KEY,
    creditLimit DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Category (
    categoryID INT          PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Subscription
--   subscribes : many-to-one, total -> userID NOT NULL
--   charged_to : many-to-one, total -> IBAN NOT NULL
--   yearlyCost is a DERIVED attribute in the ER diagram (dashed oval),
--   so it is not stored. The view SubscriptionCost computes it.
--   serviceName is added so the UI can show "Spotify" instead of an ID.
CREATE TABLE Subscription (
    subID        INT           PRIMARY KEY AUTO_INCREMENT,
    serviceName  VARCHAR(100)  NOT NULL,
    amount       DECIMAL(15,2) NOT NULL,
    billingCycle VARCHAR(20)   NOT NULL,         -- weekly | monthly | quarterly | yearly
    userID       INT           NOT NULL,
    IBAN         VARCHAR(50)   NOT NULL,
    FOREIGN KEY (userID) REFERENCES `User`(userID)       ON DELETE CASCADE,
    FOREIGN KEY (IBAN)   REFERENCES BankAccount(IBAN)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Budget
--   sets   : many-to-one, total -> userID NOT NULL
--   limits : many-to-one, total -> categoryID NOT NULL
--   month is 'YYYY-MM'; one budget per user, category and month
CREATE TABLE Budget (
    budgetID    INT           PRIMARY KEY AUTO_INCREMENT,
    limitAmount DECIMAL(15,2) NOT NULL,
    month       CHAR(7)       NOT NULL,
    userID      INT           NOT NULL,
    categoryID  INT           NOT NULL,
    UNIQUE KEY uq_budget (userID, categoryID, month),
    FOREIGN KEY (userID)     REFERENCES `User`(userID)       ON DELETE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Transaction: WEAK entity, identified through "records" by BankAccount.
--   Primary key = owner key (IBAN) + partial key (txNo).
--   txNo counts 1, 2, 3 ... per account (computed by the app).
--   categorized : many-to-one, partial -> categoryID may be NULL
--   pays_for    : many-to-one, partial -> subID may be NULL
--   amount < 0 = money out, amount > 0 = money in
CREATE TABLE `Transaction` (
    IBAN       VARCHAR(50)   NOT NULL,
    txNo       INT           NOT NULL,
    txDate     DATE          NOT NULL,
    amount     DECIMAL(15,2) NOT NULL,
    categoryID INT           NULL,
    subID      INT           NULL,
    PRIMARY KEY (IBAN, txNo),
    FOREIGN KEY (IBAN)       REFERENCES BankAccount(IBAN)    ON DELETE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID) ON DELETE SET NULL,
    FOREIGN KEY (subID)      REFERENCES Subscription(subID)  ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================================
-- Derived attribute: Subscription.yearlyCost
-- ============================================================================
CREATE VIEW SubscriptionCost AS
SELECT s.subID, s.serviceName, s.amount, s.billingCycle, s.userID, s.IBAN,
       ROUND(s.amount * CASE s.billingCycle
                          WHEN 'weekly'    THEN 52
                          WHEN 'monthly'   THEN 12
                          WHEN 'quarterly' THEN 4
                          ELSE 1
                        END, 2) AS yearlyCost
FROM Subscription s;

-- ============================================================================
-- Indexes for common lookups
-- ============================================================================
CREATE INDEX idx_bankaccount_userID     ON BankAccount(userID);
CREATE INDEX idx_transaction_date       ON `Transaction`(txDate);
CREATE INDEX idx_transaction_categoryID ON `Transaction`(categoryID);
CREATE INDEX idx_transaction_subID      ON `Transaction`(subID);
CREATE INDEX idx_subscription_userID    ON Subscription(userID);
CREATE INDEX idx_budget_month           ON Budget(userID, month);
