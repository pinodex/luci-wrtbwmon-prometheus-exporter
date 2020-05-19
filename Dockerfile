FROM node:12.16-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY . .

RUN npm ci

CMD npm start
