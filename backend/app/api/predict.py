from flask import Blueprint, request, jsonify
from ..models.financial_data import FinancialData
from app import db
import joblib
from app.models.credit_score import CreditScore
from datetime import datetime
from app.utils.auth import token_required
from app.middleware.validation import validate_financial_data
import os
import logging

predict_bp = Blueprint('predict', __name__)

# Check if the model file exists
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../machine_learning/models/model.pkl'))

if os.path.exists(model_path):
    model = joblib.load(model_path)
    logging.info(f"Successfully loaded model from {model_path}")
else:
    model = None
    logging.warning(f"Model file not found at {model_path}. Predictions will not be available.")

@predict_bp.route('/predict', methods=['POST'])
@token_required
def predict(current_user):
    data = request.get_json()

    # Validate input data
    is_valid, error_message = validate_financial_data(data)
    if not is_valid:
        return jsonify({'error': error_message}), 400

    # If the model is not loaded, return an error message
    if model is None:
        return jsonify({'error': 'Model is not available for predictions.'}), 500

    input_data = [
        data['annual_income'],
        data['monthly_expenses'],
        data['employment_status'],  # You may need to encode this
        data['credit_history_length'],
        data['num_existing_loans'],
        data['loan_amount']
    ]

    # Make prediction
    predicted_score = model.predict([input_data])[0]

    # Save prediction to database
    credit_score = CreditScore(user_id=current_user, score=predicted_score, generated_at=datetime.utcnow())
    db.session.add(credit_score)
    db.session.commit()

    return jsonify({'predicted_score': predicted_score}), 200

def categorize_risk(score):
    if score < 600:
        return 'High Risk'
    elif 600 <= score < 700:
        return 'Medium Risk'
    else:
        return 'Low Risk' 
