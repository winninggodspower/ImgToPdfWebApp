from flask import Blueprint, render_template, flash, request, redirect, send_file, current_app, jsonify
from flask_login import login_required, current_user
import os, json, uuid
from src import BASE_DIR, db

from src.core.utils import MergeImageToPdf

core_blueprint = Blueprint("core", __name__)

@core_blueprint.route("/")
def home():
    return render_template("index.html", user=current_user)

@core_blueprint.route("/process", methods=["POST"])
def process():
    if not current_user.is_authenticated:
        return jsonify({'message': 'Authentication required'}), 401
    
    image_orders = json.loads(request.form.get('droppedFilesOrder'))

    if 'images' not in request.files:
        # flash("No file uploaded")
        return jsonify({'message': 'No file uploaded'}), 400
    
    images = request.files.getlist("images")
    if not images:
        # flash("no file uploaded")
        return jsonify({'message': 'No file uploaded'}), 400

    pdf_filename = f"{uuid.uuid4()}.pdf"
    pdf_path = os.path.join(current_app.config["PDF_FOLDER"], pdf_filename)
    MergeImageToPdf(images, pdf_path, image_order=image_orders) 

    pdf_filename = os.path.split(pdf_path)[1]

    return redirect(f'/pdf/{pdf_filename}')

@core_blueprint.route("/ai-extract", methods=["POST"])
@login_required
def ai_text_extraction():
    if current_user.credits < current_app.config['CREDIT_PER_USE']:
        # flash('you don\'t have enough credits. purhcase credit to complete this action', 'info')
        return jsonify({'message': 'you don\'t have enough credits. purhcase credit to complete this action'}), 400
    
    # extract text ai code here

    # reduce user credits after ai extraction
    current_user.credits -= current_app.config['CREDIT_PER_USE']
    db.session.commit()

@core_blueprint.route("/pdf/<pdf_file>")
def send_pdf(pdf_file):
    return send_file(os.path.join(BASE_DIR, current_app.config["PDF_FOLDER"], pdf_file)) 