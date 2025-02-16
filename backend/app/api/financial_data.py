from flask import Blueprint, request, jsonify
from app.models.financial_data import FinancialData
from app import db
import uuid

financial_data_bp = Blueprint('financial_data', __name__)

@financial_data_bp.route('/financial_data', methods=['POST'])
def add_financial_data():
    data = request.get_json()
    
    # Validate input data
    required_fields = ['user_id', 'annual_income', 'monthly_expenses', 
                       'employment_status', 'credit_history_length', 
                       'num_existing_loans', 'loan_amount']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # Additional validation can be added here (e.g., type checks)

    financial_data = FinancialData(
        id=str(uuid.uuid4()),
        user_id=data['user_id'],
        annual_income=data['annual_income'],
        monthly_expenses=data['monthly_expenses'],
        employment_status=data['employment_status'],
        credit_history_length=data['credit_history_length'],
        num_existing_loans=data['num_existing_loans'],
        loan_amount=data['loan_amount']
    )
    
    db.session.add(financial_data)
    db.session.commit()
    
    return jsonify({'message': 'Financial data added successfully'}), 201 