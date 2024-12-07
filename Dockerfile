FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN apk update
RUN apk add
RUN apk add --no-cache make gcc g++ libc6-compat bash python3 ffmpeg

RUN yarn global add node-gyp
RUN yarn install
COPY . .

CMD ["yarn", "start"]