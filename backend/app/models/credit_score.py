# backend/app/models/credit_score.py
from app import db
import uuid

class CreditScore(db.Model):
    __tablename__ = 'credit_scores'
    
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    risk_category = db.Column(db.String, nullable=False)
    generated_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, score, risk_category, generated_at):
        self.user_id = user_id
        self.score = score
        self.risk_category = risk_category
        self.generated_at = generated_at