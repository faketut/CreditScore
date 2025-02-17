import pytest
import requests

BASE_URL = 'http://localhost:5000'

def test_sql_injection():
    payload = {
        'annual_income': '100000',
        'monthly_expenses': '5000',
        'employment_status': 'employed',
        'credit_history_length': '5',
        'num_existing_loans': '2',
        'loan_amount': '10000; DROP TABLE users; --'
    }
    response = requests.post(f'{BASE_URL}/predict', json=payload)
    assert response.status_code != 500  # Ensure no SQL error occurs

def test_xss_vulnerability():
    payload = {
        'annual_income': '100000',
        'monthly_expenses': '5000',
        'employment_status': '<script>alert("xss")</script>',
        'credit_history_length': '5',
        'num_existing_loans': '2',
        'loan_amount': '10000'
    }
    response = requests.post(f'{BASE_URL}/predict', json=payload)
    assert response.status_code != 500  # Ensure no XSS error occurs 