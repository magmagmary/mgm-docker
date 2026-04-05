FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ENV PORT=3333

CMD ["npm", "run", "dev"]