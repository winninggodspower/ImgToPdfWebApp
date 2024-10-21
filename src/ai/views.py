import os
import re
from flask import Blueprint, current_app, json, jsonify, render_template, request
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename

from src import db
from src.ai.models import QuizResource
from src.ai.utils import extract_text_from_images, extract_text_from_pdf, generate_questions_from_pdf_text, generate_questions_from_text


ai_blueprint = Blueprint("ai", __name__)

@ai_blueprint.route('/quiz/')
def quiz_start_view():
    return render_template('start_quiz.html', user=current_user, dev_server=True)

# react template views
@ai_blueprint.route('/quiz/<resource_uuid>')
def quiz_view(resource_uuid):
    return render_template('quiz.html', user=current_user, dev_server=True)


@ai_blueprint.route("/ai-extract", methods=["POST"])
@login_required
def ai_text_extraction():
    if current_user.credits < current_app.config['CREDIT_PER_USE']:
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


@ai_blueprint.route("/create-ai-quiz", methods=["POST"])
def create_ai_quiz():
    resource_type = request.form.get('resource_type')
    text_content = None

    if resource_type == 'text':
        text_content = request.form.get('text')

    elif resource_type == 'pdf':
        if 'pdfFile' not in request.files:
            return jsonify({'error': 'No PDF file provided'}), 400
        
        pdf_file = request.files['pdfFile']
        if pdf_file:
            # Extract text from PDF 
            text_content = extract_text_from_pdf(pdf_file)

    elif resource_type == 'picture':
        if 'pictureFile' not in request.files:
            return jsonify({'error': 'No picture files provided'}), 400
        
        print('picture was found')
        picture_files = request.files.getlist('pictureFile')
        if picture_files:
            text_content = extract_text_from_images(picture_files)

    else:
        print('None. nah wah ohh')
        return jsonify({'error': 'resource not supplied'}), 400


    # Create a new quiz resource
    quiz_resource = QuizResource(
        resource_type=resource_type,
        text_content=text_content,
    )
    db.session.add(quiz_resource)
    db.session.commit()

    # Return the generated quiz UUID
    return jsonify({'uuid': quiz_resource.uuid}), 201

@ai_blueprint.route('/get-quiz-questions/<resource_uuid>/', methods=["GET"])
def start_quiz(resource_uuid):
    # get resource by resource uuid
    quiz_resource = QuizResource.query.filter_by(uuid=resource_uuid).first()

    if not quiz_resource:
        return jsonify({'error': 'Quiz resource not found'}), 404

     # Generate questions 
    if quiz_resource.resource_type == 'text':
        raw_questions = generate_questions_from_text(quiz_resource.text_content)
    elif quiz_resource.resource_type == 'pdf':
        raw_questions = generate_questions_from_pdf_text(quiz_resource.text_content)
    elif quiz_resource.resource_type == 'picture':
        raw_questions = generate_questions_from_text(quiz_resource.text_content)

    print(raw_questions)
    cleaned_json = re.sub(r'^```json\n|\n```$', '', raw_questions.strip())
    try:
        questions = json.loads(cleaned_json)
    except json.JSONDecodeError:
        return jsonify({'error': 'Failed to parse questions'}), 500

    print(questions)
    # Return the questions as JSON
    return jsonify(questions), 200