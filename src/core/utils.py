import tempfile
from PyPDF2 import PdfWriter
from PIL import Image
from werkzeug.utils import secure_filename
import os


class MergeImageToPdf:
    def __init__(self, images, pdf_path, image_order: list=None):
        self.pdf_path = pdf_path

        with tempfile.TemporaryDirectory() as temp_directory:
            image_paths = []
            for image in images:
                if image:
                    filename = secure_filename(image.filename)
                    image_path = os.path.join(temp_directory, filename)
                    image.save(image_path)
                    image_paths.append(image_path)
                    
                    # change image name to secure name in image_order array
                    if image_order:
                        image_order[image_order.index(image.filename)] = filename

            self.convert_to_pdf(image_paths, image_order)

    def convert_to_pdf(self, image_paths:list, image_order:list):
        merger = PdfWriter()
        temp_pdf_files = []
        
        # create pdf temporary file and append it temp_pdf_files list
        for image in image_order:
            image_path = [img for img in image_paths if img.endswith(image)]
            image_path = image_path[0]
            with Image.open(image_path) as img:
                    img = img.convert("RGB")
                    img_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
                    temp_pdf_files.append(img_pdf)
                    print(img_pdf.name)
                    img.save(img_pdf.name, format="PDF")
                    merger.append(img_pdf.name)

        # for image_path in image_paths:
        #     with Image.open(image_path) as img:
        #         img = img.convert("RGB")
        #         img_pdf = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        #         temp_pdf_files.append(img_pdf)
        #         print(img_pdf.name)
        #         img.save(img_pdf.name, format="PDF")
        #         merger.append(img_pdf.name)

        merger.write(self.pdf_path)
        merger.close()

        # Close and delete temporary PDF files
        for temp_pdf_file in temp_pdf_files:
            temp_pdf_file.close()
            os.remove(temp_pdf_file.name)