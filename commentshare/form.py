from flask_wtf import FlaskForm  
from wtforms import StringField, PasswordField, SubmitField, BooleanField, ValidationError  
from wtforms.validators import DataRequired, Length, Email, EqualTo  
from commentshare.models import User
  
  
class RegistrationForm(FlaskForm):  
    username = StringField('Username',  validators=[DataRequired(), Length(min=2, max=20)])  
    email = StringField('Email',validators=[DataRequired(), Email()])  
    password = PasswordField('Password',validators=[DataRequired()])  
    confirm_password = PasswordField('Confirm Password',validators=[DataRequired(), EqualTo('password')])  
    submit = SubmitField('アカウントを作成') 
    
    
######バリデーションチェックメソッド（サブミットした際におこなわれる）
    def validate_username(self, username):
        #同一ユーザーが存在するか
        user = User.query.filter_by(username=username.data).first()  
        if user:  
            raise ValidationError('そのユーザー名は登録されています。別のユーザー名をお試しください')  
  
    def validate_email(self, email):
        #同一のメールアドレスが存在していないか
        email = User.query.filter_by(email=email.data).first()  
        if email:  
            raise ValidationError('そのmail addressは登録されています。別のaddressをお試しください')  
            
########################################################################
  
class LoginForm(FlaskForm):  
    email = StringField('Email',validators=[DataRequired(), Email()])  
    password = PasswordField('Password', validators=[DataRequired()])  
    remember = BooleanField('Remember me')  
    submit = SubmitField('ログイン')
