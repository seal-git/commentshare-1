from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config.from_object('app.config.Config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
db.create_all()
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from app.routes import routes