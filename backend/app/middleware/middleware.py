import jwt
from flask import request, jsonify
from functools import wraps

SECRET_KEY = 'your_secret_key'  # Change this to a secure key

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Check if token is passed in the headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # Bearer token

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            # Decode the token
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data['user_id']  # Assuming you store user_id in the token
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(current_user, *args, **kwargs)

    return decorated 

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        user = User.query.get(current_user)
        if not user or user.role != 'admin':
            return jsonify({'message': 'Admin access required!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated 

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
    
    # Define expected keys and their types
    expected_keys = {
        'email': str,
        'password': str,
        # Add other expected keys and their types here
    }
    
    for key, expected_type in expected_keys.items():
        if key not in data:
            raise ValueError(f"Missing key: {key}")
        if not isinstance(data[key], expected_type):
            raise ValueError(f"Invalid type for key '{key}': expected {expected_type.__name__}, got {type(data[key]).__name__}")

    return True 