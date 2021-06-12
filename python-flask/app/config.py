import os


class AppConfig:
    SECRET_KEY = '304b035772998ae68998d32bba0d1216'
    user = os.getenv('DB_USER', 'root')
    password = os.getenv('DB_PASSWORD', 'pass')
    SQLALCHEMY_DATABASE_URI = f""" \
        mysql+mysqlconnector://{user}:{password}@mysql:3306/db \
        """


Config = AppConfig