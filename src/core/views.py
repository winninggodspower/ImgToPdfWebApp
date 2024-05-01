from flask import Blueprint, render_template, flash, request, redirect, send_file, current_app
import os
from src import BASE_DIR

from src.core.utils import MergeImageToPdf

core_blueprint = Blueprint("core", __name__)

@core_blueprint.route("/")
def home():
    return render_template("index.html")
    
@core_blueprint.route("/process", methods=["POST"])
def process():
    if 'images' not in request.files:
        flash("No file uploaded")
    
    images = request.files.getlist("images")
    if not images:
        flash("no file uploaded")

    else:
        pdf_path = os.path.join(current_app.config["PDF_FOLDER"], "merge.pdf")
        MergeImageToPdf(images, pdf_path) 

        pdf_filename = os.path.split(pdf_path)[1]
        return redirect(f'/pdf/{pdf_filename}')
        
    return redirect("/")

@core_blueprint.route("/pdf/<pdf_file>")
def send_pdf(pdf_file):
    return send_file(os.path.join(BASE_DIR, current_app.config["PDF_FOLDER"], pdf_file)) 