from app.extensions import db
import uuid

class ModelVersion(db.Model):
    __tablename__ = 'model_versions'
    
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    version = db.Column(db.String(50), nullable=False)
    path = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    is_active = db.Column(db.Boolean, default=False) 