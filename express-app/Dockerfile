FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY index.js .

ENV PORT=5000
ENV APP_NAME="Express App"

CMD ["npm", "start"]