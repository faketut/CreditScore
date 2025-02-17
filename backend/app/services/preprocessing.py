def preprocess_financial_data(data):
    # Example preprocessing steps
    data['annual_income'] = float(data['annual_income'])
    data['monthly_expenses'] = float(data['monthly_expenses'])
    data['credit_history_length'] = int(data['credit_history_length'])
    data['num_existing_loans'] = int(data['num_existing_loans'])
    data['loan_amount'] = float(data['loan_amount'])
    
    # Additional preprocessing can be added here

    return data 