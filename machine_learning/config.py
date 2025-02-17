import os
from dotenv import load_dotenv
import pandas as pd
import random
from sqlalchemy import create_engine

load_dotenv()

MODEL_CONFIG = {
    "model_dir": os.path.abspath(os.path.join(os.path.dirname(__file__), 'models')),
    "data_dir": os.path.abspath(os.path.join(os.path.dirname(__file__), 'data')),
    "database_uri": os.getenv("DATABASE_URL", "sqlite:///dev.db"),
    "test_size": 0.2,
    "random_state": 42
}

def generate_synthetic_data(num_records):
    data = []
    for _ in range(num_records):
        annual_income = random.uniform(30000, 120000)  # Random income between 30k and 120k
        monthly_expenses = random.uniform(1000, 5000)   # Random expenses between 1k and 5k
        employment_status = random.choice(['Employed', 'Unemployed', 'Self-Employed'])
        credit_history_length = random.randint(1, 30)    # Random history length between 1 and 30 years
        num_existing_loans = random.randint(0, 5)        # Random number of existing loans
        loan_amount = random.uniform(5000, 50000)         # Random loan amount between 5k and 50k
        
        data.append({
            'annual_income': annual_income,
            'monthly_expenses': monthly_expenses,
            'employment_status': employment_status,
            'credit_history_length': credit_history_length,
            'num_existing_loans': num_existing_loans,
            'loan_amount': loan_amount
        })
    
    return pd.DataFrame(data)

def save_to_database(df):
    engine = create_engine(MODEL_CONFIG['database_uri'])
    df.to_sql('financial_data', con=engine, if_exists='append', index=False)

if __name__ == "__main__":
    num_records = 100  # Specify the number of records to generate
    synthetic_data = generate_synthetic_data(num_records)
    save_to_database(synthetic_data)
    print(f"Inserted {num_records} records into the financial_data table.") 