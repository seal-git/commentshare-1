from app import app_, db_, login_manager
from app.db_define import User
from flask import request, jsonify



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app_.route('/api_test', methods=['POST'])
def api_test():
    json_data = request.json
    print(json_data)
    return "success"