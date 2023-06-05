FROM node:18-alpine as base
LABEL maintainer "dev@webpoint.io"

FROM base as dev

WORKDIR /app

EXPOSE 3000

COPY package*.json yarn.lock /app/

RUN npm cache clean --force

RUN set -x && yarn && yarn add @nestjs/cli

FROM base as builder

WORKDIR /app

COPY --from=dev /app/node_modules /app/

COPY . .

RUN yarn build

# Production Image
FROM base as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock /app/

COPY --from=dev /app/node_modules /app/

RUN touch .env

RUN set -x && yarn --production=true

COPY --from=builder /app/dist /app/dist

CMD [ "yarn","start:prod" ]

