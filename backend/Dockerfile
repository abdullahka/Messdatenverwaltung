FROM ros
RUN apt-get update && apt-get install curl
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python2.7 get-pip.py
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN python2.7 -m pip install -r requirements.txt
COPY . /code/