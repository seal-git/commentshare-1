from flask_sqlalchemy import SQLAlchemy
from app import db_
import app.db_define

print(db_.session.get_binds())