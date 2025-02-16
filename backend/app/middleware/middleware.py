import jwt
from flask import request, jsonify
from functools import wraps
from app import app

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