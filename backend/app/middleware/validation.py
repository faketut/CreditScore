from functools import wraps
from flask import request, jsonify
import re
from app import db
from datetime import datetime



def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password requirements"""
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")
    if not any(char.isdigit() for char in password):
        raise ValueError("Password must contain at least one digit")
    if not any(char.isalpha() for char in password):
        raise ValueError("Password must contain at least one letter")
    return True

def validate_financial_data(data):
    """Validate financial data input"""
    required_fields = [
        'annual_income', 'monthly_expenses', 'employment_status',
        'credit_history_length', 'num_existing_loans', 'loan_amount'
    ]
    for field in required_fields:
        if field not in data:
            return False, f'Missing field: {field}'
        
        if field in ['annual_income', 'monthly_expenses', 'loan_amount']:
            if not isinstance(data[field], (int, float)) or data[field] < 0:
                return False, f'Invalid value for {field}: must be a non-negative number'
        
        if field == 'credit_history_length' and (not isinstance(data[field], int) or data[field] < 0):
            return False, 'Invalid credit history length: must be a non-negative integer'
        
        if field == 'num_existing_loans' and (not isinstance(data[field], int) or data[field] < 0):
            return False, 'Invalid number of existing loans: must be a non-negative integer'
    
    # Additional validation for employment status
    if data['employment_status'] not in ['employed', 'unemployed', 'self-employed']:
        return False, 'Invalid employment status: must be one of "employed", "unemployed", or "self-employed"'
    
    return True, ''

def validate_input(data):
    """Validate input data"""
    if not isinstance(data, dict) or not data:
        raise ValueError("Input must be a non-empty dictionary")
    return True

def validate_input(schema):
    """Generic input validation decorator"""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No data provided'}), 400
                
            for field, validator in schema.items():
                if field not in data:
                    return jsonify({'error': f'Missing field: {field}'}), 400
                    
                is_valid, error = validator(data[field])
                if not is_valid:
                    return jsonify({'error': error}), 400
                    
            return f(*args, **kwargs)
        return wrapper
    return decorator 