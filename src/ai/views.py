from flask import Blueprint, current_app, jsonify
from flask_login import login_required, current_user

from src import db


ai_blueprint = Blueprint("ai", __name__)

@ai_blueprint.route("/ai-extract", methods=["POST"])
@login_required
def ai_text_extraction():
    if current_user.credits < current_app.config['CREDIT_PER_USE']:
        # flash('you don\'t have enough credits. purhcase credit to complete this action', 'info')
        return jsonify({'message': 'you don\'t have enough credits. purhcase credit to complete this action'}), 400
    
    # extract text ai code here and save to pdf
    ai_extract = "text extracte by ai"

    # save digital text to pdf table instance

    # reduce user credits after ai extraction
    current_user.credits -= current_app.config['CREDIT_PER_USE']
    db.session.commit()

    # return pdf file blob

def create_ai_summary():
    pass

def create_ai_quiz():
    pass
