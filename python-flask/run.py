import subprocess

res = subprocess.call('pipenv install --system', shell=True)
print(res)

from app import app_
from flask_bootstrap import Bootstrap

if __name__ == "__main__":
    app_.run(host='0.0.0.0', port=5000, debug=True)
