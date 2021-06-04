FROM python

RUN apt-get update &&\
 pip install --upgrade pip &&\
 pip install pipenv &&\
 apt-get install -y vim less &&\
 apt-get install -y sqlite3 &&\
 apt-get install git &&\
 pip install --upgrade setuptools

#ARG project_dir=/projects/

#ADD src  $project_dir

#WORKDIR $project_dir

#RUN pip3 install -r requirements.txt