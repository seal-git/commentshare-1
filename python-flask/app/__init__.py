from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app_ = Flask(__name__)
bootstrap = Bootstrap(app_)
app_.config.from_object('app.config.Config')
db_ = SQLAlchemy(app_)
# db_.init_app(app_)
# db_.create_all()
bcrypt = Bcrypt(app_)
login_manager = LoginManager(app_)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

import app.db_init
import app.routes
import app.models
import app.views
