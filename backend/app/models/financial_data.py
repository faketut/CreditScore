from datetime import datetime
from app.extensions import db
import uuid

class FinancialData(db.Model):
    __tablename__ = 'financial_data'
    
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    annual_income = db.Column(db.Float, nullable=False)
    monthly_expenses = db.Column(db.Float, nullable=False)
    employment_status = db.Column(db.String, nullable=False)
    credit_history_length = db.Column(db.Integer, nullable=False)
    num_existing_loans = db.Column(db.Integer, nullable=False)
    loan_amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    user = db.relationship('User', backref='financial_data') 