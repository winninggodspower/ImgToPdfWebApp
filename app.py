from flask import Flask
from flask import render_template, redirect, url_for, request, flash, send_file
import os, sys, logging

from utilities.utils import MergeImageToPdf

app = Flask(__name__)
app.config["SECRET_KEY"] = "something secret"
app.config["PDF_FOLDER"] = "PDFILES"

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

@app.route("/")
def home():
    return render_template("_index.html")
    
@app.route("/process", methods=["POST"])
def process():
    if 'images' not in request.files:
        flash("No file uploaded")
    
    images = request.files.getlist("images")
    if not images:
        flash("no file uploaded")

    else:
        pdf_path = os.path.join(app.config["PDF_FOLDER"], "merge.pdf")
        MergeImageToPdf(images, pdf_path) 

        pdf_filename = os.path.split(pdf_path)[1]
        return redirect(f'/pdf/{pdf_filename}')
        
    return redirect("/")

@app.route("/pdf/<pdf_file>")
def send_pdf(pdf_file):
    return send_file(os.path.join(app.config["PDF_FOLDER"], pdf_file)) 

if __name__ == "__main__":
       app.run(debug=True)