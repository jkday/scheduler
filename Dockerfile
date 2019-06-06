FROM ubuntu:latest

USER root

# # general linux args
ARG DEBIAN_FRONTEND=noninteractive
ENV TERM linux

# # initialzing apt.
# # and then setting the local to match us. (locals and on)
# # each run is a layer and there is a max # of layers
# # each layer is run separated, and docker will only 
RUN apt-get update -yqq &&\
    apt-get upgrade -yqq &&\   
    apt-get install -yqq --no-install-recommends apt-utils

RUN apt-get install -yqq --no-install-recommends\
    node.js\
    npm\ 
    curl\
    htop\
    vim\
    sudo

# File Author / Maintainer
MAINTAINER Example JDAY


#RUN sudo apt-get install -y mongodb
# Install MongoDB package (.deb)
#RUN apt-get install -y mongodb
RUN sudo apt-get update
RUN sudo apt-get install -y mongodb

# Create the default data directory
RUN mkdir -p /data/db

##################### INSTALLATION END #####################

# Expose the default MONGODB port
EXPOSE 27017
# Expose localhost node port
EXPOSE 3003

# Default port to execute the entrypoint (MongoDB)
CMD ["--port 27017"]

# RUN apt-get update -yqq &&\
#     apt-get upgrade -yqq &&\
#     apt-get install -yqq --no-install-recommends apt-utils&&\
#     # locale
#     apt-get install -yqq --no-install-recommends locales &&\
#     sed -i 's/^# en_US.UTF-8 UTF-8$/en_US.UTF-8 UTF-8/g' /etc/locale.gen &&\
#     locale-gen &&\
#     update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# # install tools
# RUN apt-get install -yqq\
#     curl\
#     gnupg\
#     htop\
#     sudo\
#     # networking
#     netcat\
#     nmap\
#     iputils-ping\
#     # git
#     git

# ########### kubernetes

# # install kubectl tool
# RUN curl -o /usr/local/bin/kubectl \
#     https://storage.googleapis.com/kubernetes-release/release/v1.9.11/bin/linux/amd64/kubectl &&\
#     chmod +x /usr/local/bin/kubectl

#######
#implementation
WORKDIR /code


#######
# copy my code
COPY ./ ./
RUN rm -rf ./node_modules



###########
# config
# copy entrypt to image
WORKDIR /code

RUN npm config set strict-ssl false
RUN npm install

WORKDIR /

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# do nothing.
ENTRYPOINT ["/entrypoint.sh"]