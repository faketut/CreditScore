from sqlalchemy import create_engine
import pandas as pd
from .config import MODEL_CONFIG

def load_training_data():
    engine = create_engine(MODEL_CONFIG['database_uri'])
    query = """
        SELECT f.*, c.score 
        FROM financial_data f
        JOIN credit_scores c ON f.user_id = c.user_id
    """
    return pd.read_sql(query, engine) 