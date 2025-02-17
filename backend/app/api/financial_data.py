from flask import Blueprint, request, jsonify
from app.models.financial_data import FinancialData
from app import db
from app.middleware import token_required
from app.middleware.validation import validate_financial_data
import uuid

financial_data_bp = Blueprint('financial_data', __name__)

@financial_data_bp.route('/financial_data', methods=['POST'])
@token_required
def add_financial_data(current_user):
    data = request.get_json()
    
    # Validate input data
    is_valid, error_message = validate_financial_data(data)
    if not is_valid:
        return jsonify({'error': error_message}), 400

    financial_data = FinancialData(
        id=str(uuid.uuid4()),
        user_id=current_user,
        annual_income=data['annual_income'],
        monthly_expenses=data['monthly_expenses'],
        employment_status=data['employment_status'],
        credit_history_length=data['credit_history_length'],
        num_existing_loans=data['num_existing_loans'],
        loan_amount=data['loan_amount']
    )
    
    db.session.add(financial_data)
    db.session.commit()
    
    return jsonify({'message': 'Financial data added successfully!'}), 201 