from flask import render_template, url_for, flash, redirect, request
from commentshare import app, db, bcrypt
from commentshare.form import RegistrationForm, LoginForm

from commentshare.models import User,PDF
import os
from flask_login import login_user, current_user, logout_user, login_required
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


UPLOAD_FOLDER = './commentshare/static/pdf_uploads'
app.config["ALLOWED_EXTENSIONS"] = "PDF"
engine = create_engine('sqlite:///commentshare.db')
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


from commentshare.models import User
from flask_login import login_user, current_user, logout_user, login_required

@app.route('/')
def hello_world():
    return 'Hello, World!'
@app.route('/home')
def home():
    return render_template('home.html')
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # POSTリクエスト(登録時)
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
        flash('Account created for %s!' % form.username.data, 'success')
        return redirect(url_for('home'))
    # 初期表示時
    return render_template('register.html', title='Register', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # POSTリクエスト(ログイン時)
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('account'))
        if form.email.data == 'admin@blog.com' and form.password.data == 'password':
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    # 初期表示時
    return render_template('login.html', title='Login', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route('/account')
@login_required
def account():
    pdfs = db.session.query(PDF).filter_by(user_id=current_user.id).all()
    #print(type(pdfs))
    #print(pdfs[0].pdfname)
    return render_template('account.html',title='Account page',pdfs=pdfs)



@app.route('/pdf_uploads',methods=['GET', 'POST'])
@login_required
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('ファイルがありません')
            return redirect(request.url)
        file = request.files['file']
        print(file)
        print(file.filename)
        if file.filename == '':
            flash('ファイルがありません,')
            return redirect(request.url)
        if file and allowed_pdf(file.filename):
            pdf = PDF(pdfname=file.filename, user_id=current_user.id)
            #print(pdf)
            #print(os.path.join(UPLOAD_FOLDER,file.filename))
            db.session.add(pdf)
            db.session.commit()
            file.save(os.path.join(UPLOAD_FOLDER,(str(pdf.id)+'.pdf')))
            print(pdf)
            flash('アップロードに成功しました')
            return redirect(request.url)
    return render_template('pdf_uploads.html', title='Account page')






@app.route('/search', methods=['POST','GET'])
@login_required
def search():
    if request.method=='POST':
        keyword=str(request.form['keyword'])
        search_word=keyword
        keyword='%'+keyword+'%'
        pdfs = db.session.query(PDF).filter(PDF.pdfname.like(keyword)).all()
        return render_template('search_result.html', title='search_result',pdfs=pdfs,search_word=search_word)
    return render_template('search.html', title='search_page')



@app.route('/read_pdf')
def read_pdf():
    return render_template('viewer.html', title='pdf page')

@app.route('/add_comment', methods=['POST','GET'])
def add_comment():
    print(os.getcwd())
    if request.method == 'POST':
        result = request.get_json(force=True)
        print(result)
        filename = './commentshare/static/comments.txt'
        with open(filename, mode='a') as f:
            f.write(str(result)+"\n")
    return render_template('viewer.html', title='pdf page')


@app.route('/mypage',methods=['POST','GET'])
def mypage():
    user = db.session.query(User).filter_by(id=current_user.id).one()
    if request.method == 'POST':
        profile=request.form['profile']
        user = db.session.query(User).filter_by(id=current_user.id).one()
        user.profile=profile
        db.session.commit()
        return render_template('mypage.html', title='Mypage',user=user)
    return render_template('mypage.html', title='Mypage',user=user)