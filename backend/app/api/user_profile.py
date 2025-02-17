from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db
from app.middleware import token_required

user_profile_bp = Blueprint('user_profile', __name__)

@user_profile_bp.route('/profile', methods=['GET'])
@token_required
def get_user_profile(current_user):
    user = User.query.get(current_user)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'email': user.email,
        'created_at': user.created_at,
        'updated_at': user.updated_at
    }), 200

@user_profile_bp.route('/profile', methods=['PUT'])
@token_required
def update_user_profile(current_user):
    user = User.query.get(current_user)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200 