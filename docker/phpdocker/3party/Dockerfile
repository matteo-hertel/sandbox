################################################################################
# Base image
################################################################################

FROM php:7-cli

MAINTAINER "Matteo Hertel" <info@matteohertel.com>

################################################################################
# Add Nginx repo
################################################################################

#ENV NGINX_VERSION 1.9.12-1~jessie

#RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
#    && echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list \

################################################################################
# Install supervisor, Nginx & tools
################################################################################

RUN apt-get update && apt-get install -my \
	supervisor \
	ca-certificates \
	nginx \
	#nginx-module-xslt \
	#nginx-module-geoip \
	#nginx-module-image-filter \
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

COPY ./config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./config/php.ini /etc/php/7.0/cli/php.ini

COPY ./config/nginx.conf /etc/nginx/nginx.conf


################################################################################
# Boot
################################################################################

EXPOSE 80 443

CMD ["/usr/bin/supervisord"]
