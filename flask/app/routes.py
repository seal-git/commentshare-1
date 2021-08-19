from flask import render_template, url_for, flash, redirect, request
from app import app_, db_, bcrypt
from app.form import RegistrationForm, LoginForm,Resetform
import datetime
import pytz
from app.db_define import User,PDF,Comment
import os
import json
from flask_login import login_user, current_user, logout_user, login_required
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

UPLOAD_FOLDER = './flask/static/pdf_files'
app_.config["ALLOWED_EXTENSIONS"] = "PDF"
engine = create_engine('sqlite:///flask.db_')
Session = sessionmaker(bind=engine)
session = Session()


def allowed_pdf(filename):

    if not "." in filename:
        return False

    extention = filename.rsplit(".", 1)[1]

    if extention.upper() in app.config["ALLOWED_EXTENSIONS"]:
        return True
    else:
        return False


