FROM ubuntu:latest

MAINTAINER "Matteo Hertel" <info@matteohertel.com>

RUN \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y build-essential g++ flex bison gperf ruby perl \
    libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev \
    libpng-dev libjpeg-dev python libx11-dev libxext-dev git

RUN git clone git://github.com/ariya/phantomjs.git && \
    cd phantomjs && \
    git checkout 2.1.1 && \
    git submodule init && \
    git submodule update

RUN cd phantomjs && python build.py

CMD /bin/bash
