# author:Yuki Yoshinari

## TO DO(フロントエンド)
- pxで定義しているのでブラウザごとに違う値で保存されてしまう
- 送信ボタンが小さい
- フォームも小さい
- すでにコメントが存在しているところは色を付けたい
- ページ番号、pxの比、内容、scalexで定義する
- コメントを送った時の挙動はリロードでよいのか？
- 時間をDateで表示する
- リプライとそれ以外を分ける
- pdfのリストを新しい順に表示
- pdfの投稿に成功したら閲覧ボタンも表示する
- アカウント情報とコメントの紐づけ

## Python 3.6.10
###インストールしたライブラリ 及び目的
- Flask                 1.0.4
- Flask-Bcrypt          0.7.1 	パスワードをハッシュ化してくれる
- Flask-Bootstrap       3.3.7.1 	フォームやテーブルなどいい感じに（フレームワーク？）
- Flask-Login           0.5.0		ログイン機能などの実装を簡単にできる
- Flask-SQLAlchemy      2.4.3 	flaskでデータベースを扱うのに必要
- Flask-WTF             0.14.		入力フォームを簡単に作れる。（デザインには不向き？）

## 参考にしたページ
- https://qiita.com/msrks/items/88831fc265a93bd62e24
- https://qiita.com/msrks/items/d9c327dd81749ec01d1d
- https://study-flask.readthedocs.io/ja/latest/02.html#
