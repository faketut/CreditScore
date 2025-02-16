from datetime import datetime
from app import db

class FinancialData(db.Model):
    __tablename__ = 'financial_data'
    
    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    annual_income = db.Column(db.Numeric, nullable=False)
    monthly_expenses = db.Column(db.Numeric, nullable=False)
    employment_status = db.Column(db.String(50), nullable=False)
    credit_history_length = db.Column(db.Integer, nullable=False)
    num_existing_loans = db.Column(db.Integer, nullable=False)
    loan_amount = db.Column(db.Numeric, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='financial_data') 