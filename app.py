from flask import Flask
from flask import render_template,request,flash,send_file
from werkzeug.utils import secure_filename
import webbrowser
import os,sys

from utilities.convert import ImagesToPdf

app = Flask(__name__)
app.config["SECRET_KEY"] = "something secret"
app.config["file_path"] = "pictures"
app.config["pdfFile_path"] = "pdf/merge.pdf"

server_port = sys.argv[1]

@app.route("/")
def home():
    return render_template("index.html")
    
@app.route("/process",methods=["POST"])
def process():
    files = request.files.getlist("images")
    if not files:
        flash("no file uoloaded")
        pdffile = None
       
    else:
   
        for file in files:
            print(file.filename)
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["file_path"],filename))
            print("file saved")
            flash("upload succeeded")
            
        ImagesToPdf(app.config["file_path"],'pdf','merge.pdf')
        deleteSavedFiles()
        pdffile = True
    return render_template("index.html",pdfFile = pdffile)
    

@app.route("/download/pdf")
def getPdf():
    return send_file(app.config["pdfFile_path"])
    
def deleteSavedFiles():
    for file in os.listdir(app.config["file_path"] ):
        os.remove(os.path.join(app.config["file_path"] ,file))

if __name__ == "__main__":
       app.run(debug=True,port=server_port)
