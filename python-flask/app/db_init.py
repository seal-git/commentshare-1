from flask_sqlalchemy import SQLAlchemy
from app import db_
from app.db_define import *
import bcrypt

init_all = False  # dbの定義を変更した場合はTrueにして作り直す
if init_all:
    db_.drop_all() # dbを作り直す．dbを消したくない場合は注意．

    db_.create_all()
    # PDFのサンプルデータ作成
    data_list = [['id_naist_exam','naist_exam',0],
            ['id_test','test',0],
            ['id_PDF_sample_1','PDF_sample_1',0],
            ['id_PDF_sample_2','PDF_sample_2',0],
            ['id_PDF_sample_3','PDF_sample_3',0],
            ]
    init_pdf_list = []
    for data in data_list:
        init_pdf = PDF()
        init_pdf.id = data[0]
        init_pdf.pdfname = data[1]
        init_pdf.filename = 'static/pdf_files/'+data[0]+'.pdf'
        init_pdf.user_id = data[2]
        init_pdf_list.append(init_pdf)

    db_.session.add_all(init_pdf_list)
    db_.session.commit()

    # ユーザーのサンプルデータ作成
    data_list = [['user1', 'user1@is.naist.jp', b'pass'],
                 ['user2', 'user2@is.naist.jp', b'pass'],
                 ['user3', 'user3@is.naist.jp', b'pass'],
            ]
    init_user_list = []
    for data in data_list:
        init_user = User()
        init_user.username = data[0]
        init_user.email = data[1]
        init_user.password = bcrypt.hashpw(data[2], bcrypt.gensalt())
        init_user_list.append(init_user)

    db_.session.add_all(init_user_list)
    db_.session.commit()
else:
    db_.create_all()
