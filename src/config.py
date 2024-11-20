import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URI = os.getenv("DATABASE_URL")
if DATABASE_URI.startswith("postgres://"):
    DATABASE_URI = DATABASE_URI.replace("postgres://", "postgresql://", 1)

PDF_FOLDER = 'PDFILES'
# create pdf folder id it doesn't exist already
if not os.path.isdir(PDF_FOLDER):
    os.makedirs(PDF_FOLDER)

class Config(object):
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = os.getenv("SECRET_KEY", default="guess-me")
    SQLALCHEMY_DATABASE_URI = DATABASE_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    PDF_FOLDER = 'PDFILES'
    CREDIT_PER_USE = 5
    PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY')

class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True
    WTF_CSRF_ENABLED = False
    DEBUG_TB_ENABLED = True

class ProductionConfig(Config):
    DEBUG = False
    DEBUG_TB_ENABLED = False