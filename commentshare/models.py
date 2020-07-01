from datetime import datetime
from  commentshare import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    
class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    def __repr__(self):
        return "User('{}', '{}')".format(self.id, self.username)

class PDF(db.Model):
    __tablename__ = 'PDF'
    id = db.Column(db.Integer, primary_key=True)
    pdfname = db.Column(db.String(50),nullable=False)
    user_id = db.Column(db.Integer,nullable=False)
    created = db.Column('created', db.DATETIME, default=datetime.now, nullable=False)
    permission = db.Column(db.Integer,default = 1)
    def __repr__(self):
        return "PDF('{}', '{}','{}','{}','{}')".format(self.id, self.pdfname,self.user_id,self.created,self.permission)