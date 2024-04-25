import tempfile
from PyPDF2 import PdfWriter
from PIL import Image
from flask import Flask
from flask import render_template, request, flash,send_file
from werkzeug.utils import secure_filename
import os, sys, logging

app = Flask(__name__)
app.config["SECRET_KEY"] = "something secret"
app.config["PDF_FOLDER"] = "PDFILES"

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

@app.route("/")
def home():
    return render_template("index.html")
    
@app.route("/process",methods=["POST"])
def process():
    if 'images' not in request.files:
        flash("No file uploaded")
        pdffile = None
    
    images = request.files.getlist("images")
    if not images:
        flash("no file uploaded")
        pdffile = None

    else:
        pdf_path = os.path.join(app.config["PDF_FOLDER"], "merge.pdf")
        with tempfile.TemporaryDirectory() as temp_directory:
            image_paths = []
            for image in images:
                if image:
                    filename = secure_filename(image.filename)
                    image_path = os.path.join(temp_directory, filename)
                    image.save(image_path)
                    image_paths.append(image_path)

            convert_to_pdf(image_paths, pdf_path)
            
        # ImagesToPdf(app.config["file_path"],'pdf','merge.pdf')
        pdffile = True
    return render_template("index.html", pdfFile=pdffile)
    
def convert_to_pdf(image_paths, pdf_path):
    merger = PdfWriter()
    temp_pdf_files = []
    
    for image_path in image_paths:
        with Image.open(image_path) as img:
            img = img.convert("RGB")
            img_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
            temp_pdf_files.append(img_pdf)
            print(img_pdf.name)
            img.save(img_pdf.name, format="PDF")
            merger.append(img_pdf.name)

    merger.write(pdf_path)
    merger.close()

    # Close and delete temporary PDF files
    for temp_pdf_file in temp_pdf_files:
        temp_pdf_file.close()
        os.remove(temp_pdf_file.name)

@app.route("/download/pdf")
def getPdf():
    return send_file(app.config["PDF_FOLDER"] + "/merge.pdf")

if __name__ == "__main__":
       app.run(debug=True)
