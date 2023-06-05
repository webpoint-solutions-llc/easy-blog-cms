FROM node:18-alpine as base

LABEL maintainer "dev@webpoint.io"

WORKDIR /app

## Define dev stage 
FROM base as dev
COPY package*.json .

RUN npm i

## Define build stage
FROM dev as build

COPY . .

RUN npm run build

## Define prod image
FROM nginx:1.25-alpine as prod
WORKDIR /app

COPY default.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist/ /app/

COPY ./public /app/

CMD ["nginx", "-g", "daemon off;"]