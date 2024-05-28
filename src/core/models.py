from datetime import datetime

from src import db

class CreatedPdf(db.Model):

    __tablename__ = "createdpdf"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    pdf_path = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_on = db.Column(db.DateTime, nullable=False) 

    def __init__(self, title, pdf_path, owner_id):
        self.title = title
        self.pdf_path = pdf_path
        self.owner_id = owner_id
        self.created_on = datetime.now()

    def __repr__(self):
        return f"<pfd {self.title}>"