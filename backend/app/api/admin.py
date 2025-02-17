from flask import Blueprint, request, jsonify
from app.models.user import User
from app.models.model_version import ModelVersion  # Ensure ModelVersion is imported
from app import db
from app.middleware import token_required, admin_required  # Import the middleware

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/users', methods=['GET'])
@token_required
@admin_required
def get_all_users(current_user):
    users = User.query.all()
    user_data = [{'id': user.id, 'email': user.email, 'created_at': user.created_at} for user in users]
    return jsonify(user_data), 200

@admin_bp.route('/admin/users/<user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

@admin_bp.route('/admin/users/<user_id>', methods=['GET'])
@token_required
@admin_required
def get_user_details(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'id': user.id, 'email': user.email, 'created_at': user.created_at}), 200

@admin_bp.route('/admin/users/<user_id>', methods=['PUT'])
@token_required
@admin_required
def update_user(current_user, user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user.email = data.get('email', user.email)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

@admin_bp.route('/admin/model/performance', methods=['GET'])
@token_required
@admin_required
def get_model_performance(current_user):
    performance_data = db.session.query(
        ModelVersion.version,
        ModelVersion.accuracy,
        ModelVersion.precision,
        ModelVersion.recall,
        ModelVersion.created_at
    ).order_by(ModelVersion.created_at.desc()).limit(30).all()
    
    formatted_data = [
        {
            'date': version.created_at.strftime('%Y-%m-%d'),
            'accuracy': float(version.accuracy),
            'precision': float(version.precision),
            'recall': float(version.recall)
        }
        for version in performance_data
    ]
    
    return jsonify(formatted_data), 200

@admin_bp.route('/admin/retrain_model', methods=['POST'])
@token_required
@admin_required
def retrain_model(current_user):
    # Logic to retrain the model
    # This could involve calling a function that handles the training process
    # For example: train_model_function()
    return jsonify({'message': 'Model retraining initiated.'}), 200 