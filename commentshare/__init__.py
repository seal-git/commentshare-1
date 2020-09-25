from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
bootstrap = Bootstrap(app)

app.config['SECRET_KEY'] ='304b035772998ae68998d32bba0d1216'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///commentshare.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
db.create_all()
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from commentshare import routes