# Easy Blog CMS Backend &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

> Backend application for talents point

Easy-Blog-CMS is an open-source solution, meaning the entire codebase is available on GitHub and continuously maintained by a community of contributors. Enjoy the freedom to tailor the admin panel and API to your specific needs. The API is designed to be consumed by any client, be it a web application (React, Vue, Angular).

## Installing / Getting started

Easy Blog CMS use the templete for backend. Please find through the [Link](https://github.com/andrechristikan/ack-nestjs-mongoose)

## Developing

### Built With

| Name           | Version |
| -------------- | ------- |
| NestJs         | v9.x    |
| NodeJs         | v18.x   |
| Typescript     | v4.x    |
| Mongoose       | v6.x    |
| MongoDB        | v6.x    |
| Yarn           | v1.x    |
| NPM            | v8.x    |
| Docker         | v20.x   |
| Docker Compose | v2.x    |

### Prerequisites

1. Understand [NestJs Fundamental](http://nestjs.com), Main Framework. NodeJs Framework with support fully TypeScript.
2. Understand[Typescript Fundamental](https://www.typescriptlang.org), Programming Language. It will help us to write and read the code.
3. Understand [ExpressJs Fundamental](https://nodejs.org), NodeJs Base Framework. It will help us in understanding how the NestJs Framework works.
4. Understand what NoSql is and how it works as a database, especially [MongoDB.](https://docs.mongodb.com)
5. Optional, Understand [Docker](ref-docker) that can help you to run the project

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/webpoint-solutions-llc/easy-blog-cms`
yarn install
```

### Create Environment

Create your own environment with copy from .env.example and edit some value

```
cp .env.example .env
```

### Database Migration

For migrate

```
yarn migrate
```

For rollback

```
yarn rollback
```

### Run Project

Now run the project using command

```
yarn start:dev
```

### Run Project with Docker

```
docker-compose up -d
```

### Building

```shell
yarn build
```

### Deploying / Publishing

give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

There is no hard and fast configration just configure env as describe abive

## Tests

For unit testing

```
yarn test:unit
```

For integration testing

```
yarn test:integration
```

For E2E Testing

```
yarn test:e2e
```

## Style guide

You can find Style guide line in following [link]("https://github.com/webpoint-solutions-llc/talent-point-front-end/blob/dev/docs/guidelines.md#code-style")

## Api Reference

API Documentation [Link](https://documenter.getpostman.com/view/12945794/VUxPtSUX#4793e55c-85df-436a-968d-826e473ac780)

## Database

Mongodb database has been used in the project go through [link](https://www.mongodb.com/docs/manual/installation/) to set up database

## Licensing

Distributed under MIT licensed.
