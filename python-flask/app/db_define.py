from app import db_
from datetime import datetime
from flask_login import UserMixin


class User(db_.Model, UserMixin):
    __tablename__ = 'User'
    id = db_.Column(db_.Integer, primary_key=True)
    username = db_.Column(db_.String(20), unique=True, nullable=False)
    email = db_.Column(db_.String(120), unique=True, nullable=False)
    password = db_.Column(db_.String(60), nullable=False)
    profile = db_.Column(db_.String(400), server_default='no data!',
                         nullable=False)

    def __repr__(self):
        return "User('{}', '{}','{}','{}')".format(self.id, self.username,
                                                   self.email, self.profile)


class PDF(db_.Model):
    __tablename__ = 'PDF'
    id = db_.Column(db_.String(16), primary_key=True)
    pdfname = db_.Column(db_.String(50), nullable=False)
    user_id = db_.Column(db_.Integer, nullable=False)
    created = db_.Column('created', db_.DATETIME, default=datetime.now,
                        nullable=False)
    permission = db_.Column(db_.Integer, default=1)

    def __repr__(self):
        return "PDF('{}', '{}','{}','{}','{}')".format(self.id, self.pdfname,
                                                       self.user_id,
                                                       self.created,
                                                       self.permission)


class Comment(db_.Model):
    __tablename__ = 'Comment'
    id = db_.Column(db_.Integer, primary_key=True)
    value = db_.Column(db_.String(400), nullable=False)
    pdf_id = db_.Column(db_.Integer, nullable=False, default=1)
    user_id = db_.Column(db_.Integer, nullable=False)
    user_name = db_.Column(db_.String(20), nullable=False)
    span_page = db_.Column(db_.Integer, nullable=False)
    span_left = db_.Column(db_.Float, nullable=False)
    span_top = db_.Column(db_.Float, nullable=False)
    created = db_.Column(db_.DATETIME, default=datetime.now, nullable=False)

    def __repr__(self):
        return "comment('{}', '{}','{}','{}','{}','{}','{}','{}','{}')".format(
            self.id, self.value, self.pdf_id, self.user_id, self.user_name,
            self.span_page, self.span_left, self.span_top, self.created)
