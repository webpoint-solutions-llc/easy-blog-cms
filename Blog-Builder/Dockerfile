FROM node:alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN set -x && yarn
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]