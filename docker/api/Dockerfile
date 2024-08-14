FROM node:20.10-alpine

WORKDIR /api

RUN apk add --no-cache python3 make g++

RUN npm i -g yarn --force

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["sh", "-c", "yarn migrate && yarn start:prod"]
