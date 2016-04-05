################################################################################
# Base image
################################################################################

FROM php:7-fpm

MAINTAINER "Andrew McLagan" <andrew@ethicaljobs.com.au>

################################################################################
# Add keys
################################################################################

COPY ./3party/keys/nginx_signing.key /var/keys/nginx_signing.key

################################################################################
# Add Nginx repo
################################################################################


RUN sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0x5a16e7281be7a449\
    echo deb http://dl.hhvm.com/debian jessie nginx | tee /etc/apt/sources.list.d/hhvm.list\
    apt-get update\
    apt-get install hhvm


################################################################################
# Install supervisor, HHVM, Nginx & tools
################################################################################

RUN apt-get update && apt-get install -my \
	supervisor \
	ca-certificates \
	nginx \
	gettext-base \
	libmcrypt-dev \
	git \
	wget \
	curl \
	mailutils \
	sendmail \
	&& docker-php-ext-install mcrypt mbstring \
    && apt-get clean

################################################################################
# Configure Nginx
################################################################################

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

################################################################################
# Install tools
################################################################################

RUN cd $HOME && \
    wget http://getcomposer.org/composer.phar && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer && \
    wget https://phar.phpunit.de/phpunit.phar && \
    chmod +x phpunit.phar && \
    mv phpunit.phar /usr/local/bin/phpunit

RUN composer global require hirak/prestissimo

################################################################################
# Configuration
##############################################################################

COPY ./3party/config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./3party/config/php.ini /usr/local/etc/php

COPY ./3party/config/nginx.conf /etc/nginx/nginx.conf


################################################################################
# Boot
################################################################################

EXPOSE 80 443

CMD ["/usr/bin/supervisord"]
