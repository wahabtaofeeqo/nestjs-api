FROM node:12-alpine AS development

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

CMD npm run build