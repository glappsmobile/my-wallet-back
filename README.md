# Dev. Store - Backend
A simple project with Node + Express for managing financial incomes and outcomes. <br/>

### Tooling:
* [ExpressJS](https://expressjs.com/)
* [JavaScript](https://www.javascript.com/)
* [NodeJS](https://nodejs.org/en/about/)
* [PostreSQL](https://www.postgresql.org/)
* [JestJS](https://jestjs.io/)

### Prerequisites
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
* [PostgreSQL](https://www.postgresql.org/)

## Installation
### Repository
* Clone the backend repository
```sh
git clone https://github.com/glappsmobile/my-wallet-back
```
* Install NPM packages
```sh
npm install
```
### Database
<p align="center">
  <img src="https://github.com/glappsmobile/my-wallet-back/blob/assets/db_image.png" alt="Database Image"/>
</p>

* Create the dev and test database using PostgreSQL
```sh
CREATE DATABASE mywallet_test;
CREATE DATABASE mywallet_dev;
```

* Import [DATABASE.sql](https://github.com/glappsmobile/my-wallet-back/blob/main/DATABASE.sql) to both databases 
```sh
pg_dump mywallet_test < path/to/DATABASE.sql
pg_dump mywallet_dev < path/to/DATABASE.sql
```

* Put the database information in the [.env.dev](https://github.com/glappsmobile/my-wallet-back/blob/main/.env.dev) and [.env.test](https://github.com/glappsmobile/my-wallet-back/blob/main/.env.test) files in the backend repository.

### How to run:
To start the development server, run:
```sh
npm run start:dev
```
To start the frontend, run:
```sh
npm start
```
