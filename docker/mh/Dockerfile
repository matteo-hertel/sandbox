FROM nginx

MAINTAINER "Matteo Hertel" <info@matteohertel.com>

RUN apt-get update && apt-get install -y  git

# Clone the PHP source repository
RUN git clone https://github.com/php/php-src.git /usr/local/src/php

# Compile PHP7 right now to bootstrap everything else
RUN cd /usr/local/src/php && ./buildconf && ./configure \
    --prefix=/usr/local/php70 \
    --with-config-file-path=/usr/local/php70 \
    --with-config-file-scan-dir=/usr/local/php70/conf.d \
    --with-apxs2=/usr/bin/apxs2 \
    --with-libdir=/lib/x86_64-linux-gnu \
    --enable-fpm \
    --without-pear \
    --with-openssl \
    --with-curl && \
    make && make install

# Set up Rasmus's handy PHP scripts
COPY makephp /usr/bin/makephp
COPY newphp /usr/bin/newphp
RUN chmod +x /usr/bin/makephp /usr/bin/newphp

RUN php -v

COPY ./config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443
