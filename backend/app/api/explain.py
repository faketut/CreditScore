from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import shap
from app.models.model_version import ModelVersion
from app.utils.auth import token_required

explain_bp = Blueprint('explain', __name__)

@explain_bp.route('/explain', methods=['POST'])
@token_required
def explain(current_user):
    # Get active model
    model_version = ModelVersion.query.filter_by(is_active=True).first()
    if not model_version:
        return jsonify({'error': 'No active model available'}), 500
    
    # Load model
    model = joblib.load(model_version.path)
    
    data = request.get_json()
    
    # Prepare data for explanation
    input_data = np.array([
        data['annual_income'],
        data['monthly_expenses'],
        data['employment_status'],  # You may need to encode this
        data['credit_history_length'],
        data['num_existing_loans'],
        data['loan_amount']
    ]).reshape(1, -1)

    # Create SHAP explainer
    explainer = shap.Explainer(model)
    shap_values = explainer(input_data)

    # Get feature importance
    feature_importance = shap_values.values.tolist()
    
    return jsonify({'feature_importance': feature_importance}), 200 