from flask import Blueprint, render_template, flash, request, redirect, send_file, current_app, jsonify
from flask_login import login_required, current_user
import os, json, uuid
from src import BASE_DIR, db
from .models import CreatedPdf

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

    # save pdf instace to database
    new_pdf_instance = CreatedPdf(
        title = pdf_filename,
        pdf_path = pdf_path,
        owner_id = current_user.id,
    )
    db.session.add(new_pdf_instance)
    db.session.commit()

    return redirect(f'/pdf/{pdf_filename}')

@core_blueprint.route("/pdf/<pdf_file>")
def send_pdf(pdf_file):
    return send_file(os.path.join(BASE_DIR, current_app.config["PDF_FOLDER"], pdf_file)) 

@core_blueprint.route("/resources", methods=["GET"])
@login_required
def pdf_resources():
    user_pdf_resources = CreatedPdf.query.filter_by(owner_id=current_user.id).all()
    return render_template('resource.html', pdf_resources=user_pdf_resources, user=current_user)

@core_blueprint.route("/resources/latest", methods=["GET"])
@login_required
def latest_resource():
    user_latest_pdf_resource = CreatedPdf.query.filter_by(owner_id=current_user.id).first_or_404()
    
    return jsonify({
        "title": user_latest_pdf_resource.title
    }), 200  