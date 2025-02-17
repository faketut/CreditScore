import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
from sqlalchemy import create_engine
import logging
from datetime import datetime
import os
from config import MODEL_CONFIG
import uuid

# Initialize logging
logging.basicConfig(level=logging.INFO)

def train_credit_model():
    try:
        # Ensure model directory exists
        if not os.path.exists(MODEL_CONFIG['model_dir']):
            os.makedirs(MODEL_CONFIG['model_dir'])
        
        # Connect to database
        engine = create_engine(MODEL_CONFIG['database_uri'])
        print("Connected to database successfully")
        
        # Load data
        query = """
            SELECT f.*, c.score 
            FROM financial_data f
            JOIN credit_scores c ON f.user_id = c.user_id
        """
        df = pd.read_sql(query, engine)
        logging.info(f"Loaded {len(df)} records from database")

        # Preprocessing
        X = df.drop(['score', 'id', 'user_id', 'created_at', 'updated_at'], axis=1)
        y = df['score']
        
        # Define preprocessing steps
        numeric_features = ['annual_income', 'monthly_expenses', 'credit_history_length', 
                           'num_existing_loans', 'loan_amount']
        categorical_features = ['employment_status']

        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numeric_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
            ])

        # Define model pipeline
        model = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('regressor', RandomForestRegressor(random_state=42))
        ])

        # Hyperparameter tuning
        param_grid = {
            'regressor__n_estimators': [100, 200],
            'regressor__max_depth': [None, 5, 10]
        }

        grid_search = GridSearchCV(model, param_grid, cv=5, scoring='neg_mean_squared_error')
        grid_search.fit(X, y)

        # Save best model
        best_model = grid_search.best_estimator_
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        model_path = f"{MODEL_CONFIG['model_dir']}/model_{timestamp}.pkl"
        joblib.dump(best_model, model_path)
        
        # Update model version
        with engine.connect() as conn:
            conn.execute(f"""
                INSERT INTO model_versions (id, version, path, created_at, is_active)
                VALUES ('{str(uuid.uuid4())}', '{timestamp}', '{model_path}', 
                        CURRENT_TIMESTAMP, TRUE)
            """)
            conn.execute("UPDATE model_versions SET is_active = FALSE WHERE id != (SELECT id FROM model_versions ORDER BY created_at DESC LIMIT 1)")

        logging.info(f"Model trained and saved to {model_path}")
        return model_path
        
    except Exception as e:
        print(f"Error in model training: {str(e)}")
        raise 