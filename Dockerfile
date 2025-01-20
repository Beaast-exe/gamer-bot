FROM ubuntu:latest
USER root

WORKDIR /app

COPY package.json ./

RUN apt -y update
RUN apt -y install curl gnupg ffmpeg build-essential
RUN curl -fsSL https://deb.nodesource.com/setup_23.x  | bash -
RUN apt -y install nodejs
RUN npm i -g npm
RUN npm i -g yarn node-gyp
RUN npm i
RUN ffmpeg -version

COPY . .
CMD ["yarn", "start"]