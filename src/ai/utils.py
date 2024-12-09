from PIL import Image
import pytesseract
from werkzeug.datastructures import FileStorage
from pdfreader import SimplePDFViewer

import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='../../.env')
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def extract_text_from_images(image_files):
    extracted_text = ""

    for image_file in image_files:
        # Open the image file
        img = Image.open(image_file)

        # Extract text from the image using Tesseract
        text = pytesseract.image_to_string(img)
        extracted_text += f"--- Text from Image {image_file.filename} ---\n"
        extracted_text += text + "\n"

    return extracted_text

def extract_text_from_pdf(pdf_file: FileStorage) -> str:
    # Use PDFReader to extract text from the PDF
    extracted_text = ""

    # Open the PDF
    with pdf_file.stream as fb:
        viewer = SimplePDFViewer(fb)
    

        for index, canvas in enumerate(viewer):

            extracted_text += f"--- Text from Page {index + 1} ---\n"
            extracted_text += "\n".join(canvas.strings) + "\n"

    return extracted_text

def generate_questions_from_pdf_text(extracted_text: str) -> list:
    # Use the already extracted text to generate questions
    if not extracted_text:
        return []

    prompt = f'''
        This text was extracted from a PDF file. Some text might not be 100% accurate.
        With this context, generate 5 quiz questions with 3 options each based on the text below.
        please output the information in structured JSON format without using markdown code blocks

        {extracted_text}
    '''
    
    # Assuming the model object has a method generate_content to create questions from a prompt
    response = model.generate_content(prompt)
    
    # Parse the response and return it as a list of questions
    return response.text


def generate_questions_from_text(text: str) -> list:
    prompt = f'''
        this peice of text was extracted from a handwritten note picture using pytesserat.
        so therefore the extraction may not be accurate. 

        with this context can you generate me 5 quiz question with 3 options each based off the extracted text below. 
        please output the information in structured JSON format without using markdown code blocks

        {text}

        your response should have a key of questions
    '''
    response = model.generate_content(prompt)
    return response.text
