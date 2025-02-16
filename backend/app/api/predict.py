from flask import Blueprint, request, jsonify
from app.models.financial_data import FinancialData
from app import db
import joblib

predict_bp = Blueprint('predict', __name__)

# Load your trained model (make sure to adjust the path as necessary)
try:
    model = joblib.load('../machine_learning/models/model.pkl')
except FileNotFoundError:
    raise Exception("Model file not found. Please check the path.")

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Validate input data
    required_fields = ['annual_income', 'monthly_expenses', 'employment_status', 
                       'credit_history_length', 'num_existing_loans', 'loan_amount']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # Prepare data for prediction
    input_data = [
        data['annual_income'],
        data['monthly_expenses'],
        data['employment_status'],  # You may need to encode this
        data['credit_history_length'],
        data['num_existing_loans'],
        data['loan_amount']
    ]

    # Make prediction
    prediction = model.predict([input_data])
    
    return jsonify({'predicted_score': prediction[0]}), 200 