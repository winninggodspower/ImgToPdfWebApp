from datetime import datetime
import uuid

from src import db

class QuizResource(db.Model):
    __tablename__ = 'quiz_resources'
    
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=str(uuid.uuid4()))
    resource_type = db.Column(db.String(50), nullable=False)
    text_content = db.Column(db.Text, nullable=True)
    pdf_file_path = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, resource_type, text_content=None, pdf_file_path=None):
        self.uuid = str(uuid.uuid4())
        self.resource_type = resource_type
        self.text_content = text_content
        self.pdf_file_path = pdf_file_path