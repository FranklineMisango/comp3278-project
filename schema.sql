-- ============================================================================
-- Coherent Application Schema
-- Merged from: ER Diagram (app_er_digram.jpeg) + Inline FK Specification
-- Structure: ISA hierarchy preserved; all relationship FKs inlined on entities
-- ============================================================================

DROP TABLE IF EXISTS "Transaction";
DROP TABLE IF EXISTS Budget;
DROP TABLE IF EXISTS Subscription;
DROP TABLE IF EXISTS CreditCard;
DROP TABLE IF EXISTS Savings;
DROP TABLE IF EXISTS Checking;
DROP TABLE IF EXISTS BankAccount;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS "User";
DROP TABLE IF EXISTS Bank;

-- ============================================================================
-- Core Entities
-- ============================================================================

CREATE TABLE Bank (
    bankID    INT          PRIMARY KEY,
    bankName  VARCHAR(100) NOT NULL
);

CREATE TABLE "User" (
    userID INT          PRIMARY KEY,
    email  VARCHAR(255) NOT NULL UNIQUE
);

-- BankAccount: supertype of ISA hierarchy (disjoint)
-- Inline FKs: bankID → Bank (held_at), userID → User (owns, inlined from spec)
CREATE TABLE BankAccount (
    IBAN     VARCHAR(50)   PRIMARY KEY,
    balance  DECIMAL(15,2) NOT NULL DEFAULT 0,
    bankID   INT           NOT NULL,
    userID   INT           NOT NULL,
    FOREIGN KEY (bankID) REFERENCES Bank(bankID)
        ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES "User"(userID)
        ON DELETE CASCADE
);

-- ISA subtypes (disjoint)
CREATE TABLE Checking (
    IBAN VARCHAR(50) PRIMARY KEY,
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN)
        ON DELETE CASCADE
);

CREATE TABLE Savings (
    IBAN        VARCHAR(50)    PRIMARY KEY,
    interestRate DECIMAL(5,4),
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN)
        ON DELETE CASCADE
);

CREATE TABLE CreditCard (
    IBAN       VARCHAR(50)   PRIMARY KEY,
    creditLimit DECIMAL(15,2),
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN)
        ON DELETE CASCADE
);

CREATE TABLE Category (
    categoryID INT          PRIMARY KEY,
    name       VARCHAR(100) NOT NULL
);

-- Subscription: inline FKs per spec (subscribes → userID, charged_to → IBAN)
CREATE TABLE Subscription (
    subID       INT           PRIMARY KEY,
    amount      DECIMAL(15,2) NOT NULL,
    billingCycle VARCHAR(50),
    yearlyCost  DECIMAL(15,2),
    userID      INT           NOT NULL,
    IBAN        VARCHAR(50)   NOT NULL,
    FOREIGN KEY (userID) REFERENCES "User"(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (IBAN) REFERENCES BankAccount(IBAN)
        ON DELETE CASCADE
);

-- Budget: inline FKs per spec (sets → userID, limits → categoryID)
CREATE TABLE Budget (
    budgetID   INT           PRIMARY KEY,
    limitAmount DECIMAL(15,2),
    month      VARCHAR(20),
    userID     INT           NOT NULL,
    categoryID INT           NOT NULL,
    FOREIGN KEY (userID)     REFERENCES "User"(userID)
        ON DELETE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
        ON DELETE CASCADE
);

-- Transaction: inline FKs per spec
--   records → IBAN (BankAccount)
--   categorized → categoryID (Category)
--   pays_for → subID (Subscription)
CREATE TABLE "Transaction" (
    txNo       INT           PRIMARY KEY,
    txDate     DATE          NOT NULL,
    amount     DECIMAL(15,2) NOT NULL,
    IBAN       VARCHAR(50)   NOT NULL,
    categoryID INT           NOT NULL,
    subID      INT           NOT NULL,
    FOREIGN KEY (IBAN)       REFERENCES BankAccount(IBAN)
        ON DELETE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
        ON DELETE CASCADE,
    FOREIGN KEY (subID)      REFERENCES Subscription(subID)
        ON DELETE CASCADE
);

-- ============================================================================
-- Indexes for common lookups
-- ============================================================================

CREATE INDEX idx_bankaccount_bankID ON BankAccount(bankID);
CREATE INDEX idx_bankaccount_userID ON BankAccount(userID);
CREATE INDEX idx_transaction_IBAN ON "Transaction"(IBAN);
CREATE INDEX idx_transaction_categoryID ON "Transaction"(categoryID);
CREATE INDEX idx_transaction_subID ON "Transaction"(subID);
CREATE INDEX idx_subscription_userID ON Subscription(userID);
CREATE INDEX idx_subscription_IBAN ON Subscription(IBAN);
CREATE INDEX idx_budget_userID ON Budget(userID);
CREATE INDEX idx_budget_categoryID ON Budget(categoryID);

-- ============================================================================
-- End of schema
-- ============================================================================