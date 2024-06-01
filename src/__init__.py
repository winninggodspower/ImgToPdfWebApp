from decouple import config
from flask import Flask
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import sys, logging, os

dir, _ = os.path.split(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(dir)

app = Flask(__name__)
app.config.from_object(config("APP_SETTINGS"))

login_manager = LoginManager() 
login_manager.init_app(app) 
login_manager.login_view = "auth.login"

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

# Registering blueprints
from src.auth.views import auth_blueprint
from src.core.views import core_blueprint
from src.purchase.views import purchase_blueprint
from src.ai.views import ai_blueprint

app.register_blueprint(auth_blueprint)
app.register_blueprint(core_blueprint)
app.register_blueprint(purchase_blueprint)
app.register_blueprint(ai_blueprint)