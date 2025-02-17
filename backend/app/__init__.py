from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from app.extensions import db
from app.config import DevelopmentConfig, ProductionConfig
import os
import uuid
from app.api.predict import predict_bp
from app.api.auth import auth_bp
from app.api.user_profile import user_profile_bp
from app.api.admin import admin_bp

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('app.config.Config')
    
    # Initialize extensions first
    db.init_app(app)
    Migrate(app, db)
    CORS(app)
    
    # Register blueprints after extensions
    with app.app_context():
        from app.api.predict import predict_bp
        from app.api.auth import auth_bp
        from app.api.financial_data import financial_data_bp
        from app.api.admin import admin_bp
        from app.api.user_profile import user_profile_bp
        
        app.register_blueprint(predict_bp)
        app.register_blueprint(auth_bp)
        app.register_blueprint(financial_data_bp)
        app.register_blueprint(admin_bp)
        app.register_blueprint(user_profile_bp)
        
        # Create tables if not exists
        db.create_all()

    # Import middleware functions here
    from .middleware import validate_email, validate_password, validate_input, token_required, admin_required

    @app.route('/')
    def home():
        return jsonify({'message': 'Welcome.'})
    @app.route('/predict', methods=['POST'])
    @token_required
    def predict():
        # Check if the result is cached
        cache_key = f"predict:{hash(frozenset(request.json.items()))}"  # Use a hash of the JSON items for consistent key
        cached_result = redis_client.get(cache_key)
        if cached_result:
            return jsonify(cached_result), 200  # Directly return the cached result

        # Prediction logic here...
        # Assuming `model.predict()` is the function that generates the prediction
        result = model.predict(request.json)  # Define the result variable here

        # After prediction, cache the result
        redis_client.set(cache_key, result, ex=3600)  # Cache for 1 hour

    @app.route('/register', methods=['POST'])
    @validate_input({
        'email': lambda x: (validate_email(x), 'Invalid email format'),
        'password': lambda x: (validate_password(x), 'Password must be at least 8 characters with at least one number and one uppercase letter')
    })
    def register():
        data = request.get_json()
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        user = User(id=str(uuid.uuid4()), email=data['email'])
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()
        
        return jsonify({'message': 'User registered successfully'}), 201

    @app.route('/financial_data', methods=['POST'])
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

    @app.route('/admin/users', methods=['GET'])
    @token_required
    @admin_required
    def get_all_users(current_user):
        users = User.get_users_with_profiles()
        user_data = [{'id': user.id, 'email': user.email, 'profile': user.user_profile} for user in users]
        return jsonify(user_data), 200

    @app.route('/admin/users/<user_id>', methods=['DELETE'])
    @token_required
    @admin_required
    def delete_user(current_user, user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200

    @app.route('/admin/users/<user_id>', methods=['GET'])
    @token_required
    @admin_required
    def get_user_details(current_user, user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'id': user.id, 'email': user.email, 'profile': user.user_profile}), 200

    @app.route('/admin/users/<user_id>', methods=['PUT'])
    @token_required
    @admin_required
    def update_user(current_user, user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        user.email = data.get('email', user.email)
        user.set_password(data.get('password', user.password))
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200

    @app.route('/admin/model/performance', methods=['GET'])
    @token_required
    @admin_required
    def get_model_performance(current_user):
        # Dummy data for model performance
        performance_data = [
            {'date': '2023-01-01', 'accuracy': 0.95, 'precision': 0.92, 'recall': 0.90},
            {'date': '2023-02-01', 'accuracy': 0.96, 'precision': 0.93, 'recall': 0.91},
            # Add more data as needed
        ]
        return jsonify(performance_data), 200

    return app

