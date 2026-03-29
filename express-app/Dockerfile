FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
RUN npm run build

ENV PORT=5000
ENV APP_NAME="Express App"

CMD ["node", "dist/index.js"]