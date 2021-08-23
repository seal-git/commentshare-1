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
from app.db_define import User


@app_.route('/')
def hello_world():
    return redirect(url_for('home'))


@app_.route('/home')
def home():
    print(request.remote_addr)
    pdfs = db_.session.query(PDF).order_by(PDF.created.desc()).limit(3).all() #最新のPDFを降順に3つ取得
    print("---pdf---",pdfs)
    print(pdfs[0].id, pdfs[0].filename)
    return render_template('home.html', pdfs=pdfs)


@app_.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # POSTリクエスト(登録時)
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db_.session.add(user)
        db_.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
        flash('Account created for %s!' % form.username.data, 'success')
        return redirect(url_for('home'))
    # 初期表示時
    return render_template('register.html', title='Register', form=form)


@app_.route('/login', methods=['GET', 'POST'])
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

@app_.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app_.route('/account')
@login_required
def account():
    pdfs = db_.session.query(PDF).filter_by(user_id=current_user.id).all()
    length=len(pdfs)
    #print(type(pdfs))
    #print(pdfs[0].pdfname)
    return render_template('account.html',title='Account page',pdfs=pdfs,length=length)



@app_.route('/upload',methods=['GET', 'POST'])
@login_required
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('ファイルがありません')
            return redirect(request.url)
        file = request.files['file']
        file_name = request.form['file_name']
        print(file)
        print(file.filename)
        if file.filename == '':
            flash('ファイルがありません,')
            return redirect(request.url)
        if file and allowed_pdf(file.filename):
            pdf = PDF(pdfname=file_name, user_id=current_user.id)
            #print(pdf)
            #print(os.path.join(UPLOAD_FOLDER,file.filename))
            db_.session.add(pdf)
            db_.session.commit()
            file.save(os.path.join(UPLOAD_FOLDER,(str(pdf.id)+'.pdf')))
            print(pdf)
            return redirect(request.url)
        else:
            flash('pdfファイルであることを確認してください。','danger')
    return render_template('upload.html', title='Account page')






@app_.route('/search', methods=['POST','GET'])
@login_required
def search():
    if request.method=='POST':
        keyword=str(request.form['keyword'])
        search_word=keyword
        keyword='%'+keyword+'%'
        pdfs = db_.session.query(PDF).filter(PDF.pdfname.ilike(keyword)).all()
        len_pdfs=len(pdfs)
        return render_template('search_result.html', title='search_result',pdfs=pdfs,search_word=search_word,len_pdfs=len_pdfs)
    return render_template('search.html', title='search_page')


@app_.route('/read_pdf', methods=['GET'])
def read_pdf():
    #ログインしているかどうか
    if current_user.is_active:
        is_login = 1
        username = current_user.username
    else:
        is_login=0
        username = "guest"
    print(is_login)

    # pdf_idの取得
    pdf_id = request.args.get('id')
    print('-----get: ',pdf_id)
    return render_template('viewer.html',
                           title='pdf page',
                           pdf_id=pdf_id,
                           is_login=is_login,
                           username=username)

@app_.route('/add_comment', methods=['POST','GET'])
def add_comment():
    print(os.getcwd())
    if request.method == 'POST':
        result = request.get_json()
        print(result)
        if current_user.is_active:
            user_id = current_user.id
            username = current_user.username
        else:
            user_id = "-1"
            username = "guest"
        # print(str(result))
        #print(result['value'])
        #print(result["pdf_id"])
        comment = Comment(
            value=result['value'],
            user_id=user_id,
            user_name=username,
            pdf_id=result['pdf_id'],
            span_page=result['span-page'],
            span_top=result['span-top'],
            span_left=result['span-left'],
            created=datetime.datetime.now(pytz.timezone('Asia/Tokyo'))
            )
        db_.session.add(comment)
        db_.session.commit()
        #result_json = json.dumps(result)
        #print(type(result))
        #filename = './flask/static/comments.txt'
        #with open(filename, mode='a') as f:
#             str_result = str(result).replace("[", "{")
#             str_result = str(result).replace("]", "}")
#             str_result = str(result).replace("\'", "\"")
#             str_result = str_result.replace("\\\\", "\\")
            #f.write(result_json+"\n")

    return "success"


@app_.route('/mypage',methods=['POST','GET'])
@login_required
def mypage():
    user = db_.session.query(User).filter_by(id=current_user.id).one()
    if request.method == 'POST':
        profile=request.form['profile']
        user = db_.session.query(User).filter_by(id=current_user.id).one()
        user.profile=profile
        db_.session.commit()
        return render_template('mypage.html', title='Mypage',user=user)
    return render_template('mypage.html', title='Mypage',user=user)



@app_.route('/get_comment', methods=['POST','GET'])
def get_comment():
    print(os.getcwd())
    param = request.get_json()
    pdf_id=int(param["pdf_id"])
    comments = db_.session.query(Comment).filter_by(pdf_id=pdf_id).all()
    length=len(comments)
    comments_list=list()
    for i in range(length):
        dict={}
        dict['id']=comments[i].id
        dict['name']=comments[i].user_name
        dict['value']=comments[i].value
        dict['span-page']=str(comments[i].span_page)
        dict['span-top']=comments[i].span_top
        dict['span-left']=comments[i].span_left
        dict['time']=str(comments[i].created)
        comments_list.append(dict)
    #print(comments_list)
    comments_list=json.dumps(comments_list,ensure_ascii=False)
    if request.method=='POST':
        return comments_list
    else:
        return 'get'


@app_.route('/delete_pdf',methods=['POST','GET'])
@login_required
def delete():
    pdfs = db_.session.query(PDF).filter_by(user_id=current_user.id).all()
    if request.method == 'GET':
        pdf_id=request.args.get('pdf','')
        if pdf_id != '':
            pdf = db_.session.query(PDF).filter_by(id=pdf_id).first()
            if pdf.user_id == current_user.id:
                db_.session.delete(pdf)
                db_.session.commit()
                delete_path=UPLOAD_FOLDER + '/' + str(pdf_id) +'.pdf'
                print(delete_path)
                os.remove(delete_path)
                return redirect(url_for('account'))
    return render_template('delete.html',title='Delete PDF',pdfs=pdfs)



@app_.route('/test')
@login_required
def test():
    comments = db_.session.query(Comment).filter_by(user_id=current_user.id).all()
    length=len(comments)
    comments_list=list()
    for i in range(length):
        dict={}
        dict['id']=comments[i].id
        dict['value']=comments[i].value
        dict['username']=comments[i].user_name
        dict['span-page']=comments[i].span_page
        dict['span-top']=comments[i].span_top
        dict['span-left']=comments[i].span_left
        dict['date']=str(comments[i].created)
        comments_list.append(dict)
    #print(comments)
    a=[{"id":2,"value":3},{"id":3,"value":4}]
    a=json.dumps(a)
    comments_list=json.dumps(comments_list,ensure_ascii=False)
    #print(type(pdfs))
    #print(pdfs[0].pdfname)
    return render_template('test.html',title='Account page',pdf_list=comments_list,length=length,a=a)



@app_.route('/password_reset', methods=['GET', 'POST'])
def resetpassword():
    form = Resetform()
    if form.validate_on_submit():
        # POSTリクエスト(ログイン時)
        user = db_.session.query(User).filter_by(email=form.email.data).one()
        if user and user.username==form.username.data:
            hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
            user.password=hashed_password
            db_.session.commit()
            return redirect(url_for('login'))
        else:
            flash('入力されたユーザーが見つかりません', 'danger')
    return render_template('reset_password.html', title='Reset', form=form)


@app_.route('/user_mypage', methods=['GET', 'POST'])
def user_mypage():
    usr_id=2
    user = db_.session.query(User).filter_by(id=usr_id).one()
    print(user.profile)
    pdf_list=db_.session.query(Comment.user_id ,PDF.pdfname,PDF.filename,
                               Comment.created).filter_by(user_id=usr_id).join(PDF,Comment.pdf_id==PDF.id).order_by(Comment.created.desc()).group_by(PDF.pdfname).limit(3).all()
    print(pdf_list)
    return render_template('user_mypage.html', title='User Mypage',user=user,pdf=pdf_list)