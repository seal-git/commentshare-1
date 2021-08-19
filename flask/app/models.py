from app import app_, db_, login_manager
from app.db_define import User



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


