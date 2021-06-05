import subprocess

res = subprocess.call('pipenv install --system', shell=True)
print(res)

from commentshare import app
from flask_bootstrap import Bootstrap

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
