FROM ubuntu:latest

RUN apt-get update
RUN apt-get install python3 python3-pip -y
EXPOSE 5000
RUN apt-get install -y vim less
RUN apt-get install -y sqlite3
RUN apt-get install git
RUN pip3 install --upgrade setuptools

ARG project_dir=/projects/

ADD src  $project_dir

WORKDIR $project_dir

RUN pip3 install -r requirements.txt