FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.29.7-alpine

COPY --from=build /app/build /usr/share/nginx/html