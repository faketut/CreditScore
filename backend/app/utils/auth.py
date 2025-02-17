from functools import wraps
from flask import request, jsonify
from app.models.user import User
from app.middleware import token_required
from app.middleware.validation import validate_email, validate_password, validate_input

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization').split(" ")[1]
        user = User.verify_auth_token(token)
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required.'}), 403
        return f(user, *args, **kwargs)
    return decorated_function

def validate_email(email):
    # Check if the email is valid
    if not isinstance(email, str) or '@' not in email:
        raise ValueError("Invalid email format")
    return True

def validate_password(password):
    # Check if the password meets certain criteria
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")
    if not any(char.isdigit() for char in password):
        raise ValueError("Password must contain at least one digit")
    if not any(char.isalpha() for char in password):
        raise ValueError("Password must contain at least one letter")
    return True

def validate_input(data):
    # Check if the input is a dictionary and not empty
    if not isinstance(data, dict) or not data:
        raise ValueError("Input must be a non-empty dictionary")
    return True 