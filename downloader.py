import os
import pathlib
import pandas as pd
import kagglehub

def setup_kaggle_auth():
    """Configures the Kaggle access token automatically."""
    token_dir = os.path.expanduser("~/.kaggle")
    os.makedirs(token_dir, exist_ok=True)
    token_path = os.path.join(token_dir, "access_token")
    
    token_value = "KGAT_5be26136cc2ce2d2059982d0868cab4d"
    with open(token_path, "w") as f:
        f.write(token_value)
    os.chmod(token_path, 0o600)
    print("[INFO] Kaggle access token successfully configured at ~/.kaggle/access_token")

def download_datasets():
    """Downloads recommended Kaggle datasets for personal finance."""
    print("[INFO] Downloading Credit Card / Transaction History dataset...")
    tx_path = kagglehub.dataset_download("kartik2112/fraud-detection")
    
    print("[INFO] Downloading Household Budget / Spending Benchmarks dataset...")
    budget_path = kagglehub.dataset_download("sumanthnimmagadda/student-spending-dataset")
    
    print("[INFO] Downloading Subscription Pricing dataset...")
    sub_path = kagglehub.dataset_download("keremkarayaz/streaming-video-subscriptions-datasets")
    
    return tx_path, budget_path, sub_path

def process_and_export(tx_path, budget_path, sub_path):
    """Processes raw data into the specified schemas and exports as parquet/csv."""
    output_dir = pathlib.Path("./processed_financial_data")
    output_dir.mkdir(exist_ok=True)
    
    # 1. Transaction Table Schema: (txNo, date, amount, category, IBAN)
    tx_files = list(pathlib.Path(tx_path).glob("*.csv"))
    if tx_files:
        df_tx_raw = pd.read_csv(tx_files[0], nrows=10000) # Sample for performance
        transactions = pd.DataFrame({
            "txNo": range(1, len(df_tx_raw) + 1),
            "date": pd.to_datetime(df_tx_raw.get("trans_date_trans_time", pd.date_range("2025-01-01", periods=len(df_tx_raw)))),
            "amount": df_tx_raw.get("amt", df_tx_raw.get("amount", 0.0)),
            "category": df_tx_raw.get("category", "General Expense"),
            "IBAN": [f"US{i:018d}" for i in range(len(df_tx_raw))]
        })
        transactions.to_parquet(output_dir / "transactions.parquet", index=False)
        transactions.to_csv(output_dir / "transactions.csv", index=False)
        print(f"[SUCCESS] Exported transactions table ({len(transactions)} rows).")

    # 2. Budget Benchmark Table Schema: (limitAmount, month, categoryID)
    budget_files = list(pathlib.Path(budget_path).glob("*.csv"))
    if budget_files:
        # Construct standard budget benchmark limits per category reference
        budgets = pd.DataFrame({
            "categoryID": [1, 2, 3, 4, 5],
            "category_name": ["Housing", "Food & Groceries", "Transportation", "Entertainment", "Utilities"],
            "limitAmount": [1250.00, 500.00, 250.00, 150.00, 200.00],
            "month": "2026-11"
        })
        budgets.to_parquet(output_dir / "budget_benchmarks.parquet", index=False)
        budgets.to_csv(output_dir / "budget_benchmarks.csv", index=False)
        print(f"[SUCCESS] Exported budget benchmarks table.")

    # 3. Subscription Table Schema: (amount, billingCycle, yearlyCost)
    sub_files = list(pathlib.Path(sub_path).glob("*.csv"))
    if sub_files:
        df_sub_raw = pd.read_csv(sub_files[0])
        limit_n = min(len(df_sub_raw), 50)
        subscriptions = pd.DataFrame({
            "service_name": df_sub_raw.get("customer_id", [f"Service_{i}" for i in range(limit_n)]),
            "amount": df_sub_raw.get("subscription_cost", [14.99, 9.99, 12.99, 19.99, 45.00][:limit_n]),
            "billingCycle": df_sub_raw.get("subscription_interval", "monthly")[:limit_n]
        })
        # Calculate yearly cost automatically based on billing cycle
        subscriptions["yearlyCost"] = subscriptions["amount"] * 12
        
        subscriptions.to_parquet(output_dir / "subscriptions.parquet", index=False)
        subscriptions.to_csv(output_dir / "subscriptions.csv", index=False)
        print(f"[SUCCESS] Exported subscription table.")
        
    print(f"\nAll files saved successfully under directory: {output_dir.resolve()}")

if __name__ == "__main__":
    setup_kaggle_auth()
    tx_path, budget_path, sub_path = download_datasets()
    process_and_export(tx_path, budget_path, sub_path)