FROM node:18-alpine as base
LABEL maintainer "dev@webpoint.io"

WORKDIR /app
EXPOSE 5173

COPY package.json .
COPY package-lock.json .

RUN set -x && yarn
COPY . .
CMD ["npm", "run", "dev"]