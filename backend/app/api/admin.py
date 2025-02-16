from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db
from app.middleware import token_required  # Import the middleware

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['GET'])
@token_required  # Protect this route
def get_users(current_user):
    users = User.query.all()
    return jsonify([{'id': user.id, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name} for user in users]), 200

@admin_bp.route('/users/<user_id>', methods=['DELETE'])
@token_required  # Protect this route
def delete_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

@admin_bp.route('/users/<user_id>', methods=['GET'])
def get_user_details(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'id': user.id, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name}), 200

@admin_bp.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    db.session.commit()
    
    return jsonify({'message': 'User updated successfully'}), 200 