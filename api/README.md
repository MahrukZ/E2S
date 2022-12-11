# Getting Started

- [Installing NPM Packages](#installing-npm-packages)
- [Setting up Environment Variables](#setting-up-environment-variables)
- [Available Scripts](#available-scripts)

## Installing NPM Packages

### _Step 1_

Change directory to `/api` :

```
cd /api
```

### _Step 2_

Run the following command to install the required dependencies:

```
npm i
```

##### Installed NPM Packages

###### _Core Dependencies:_

- `express` package - Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org/). **Learn more [here](https://www.npmjs.com/package/express)**
- `mysql2` package - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl [much more](https://github.com/sidorares/node-mysql2/tree/master/documentation). **Learn more [here](https://www.npmjs.com/package/mysql2)**
- `sequelize` package - Sequelize is an easy-to-use and promise-based Node.js ORM tool. It features solid transaction support, relations, eager and lazy loading, read replication and more. **Learn more [here](https://www.npmjs.com/package/sequelize)**
- `cors` package - CORS is a node.js package for providing a [Connect](http://www.senchalabs.org/connect/)/[Express](http://expressjs.com/) middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options. **Learn more [here](https://www.npmjs.com/package/cors)** -`dotenv` package - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). **Learn more [here](https://www.npmjs.com/package/dotenv)**
- `typescript` package - [TypeScript](https://www.typescriptlang.org/) is a language for application-scale JavaScript. **Learn more [here](https://www.npmjs.com/package/typescript)**
- `bcrypt` package - A library to help you hash passwords. **Learn more [here](https://www.npmjs.com/package/bcrypt)**
- `cookie-parser` package - Parse Cookie header and populate req.cookies with an object keyed by the cookie names. **Learn more [here](https://www.npmjs.com/package/cookie-parser)**
- `express-session` package - A module used to create express sessions. **Learn more [here](https://www.npmjs.com/package/express-session)**
- `jsonwebtoken` package - Create and decode JWTs. **Learn more [here](https://www.npmjs.com/package/jsonwebtoken)**
- `googleapis` package - Node.js client library for using Google APIs. Support for authorization and authentication with OAuth 2.0. **Learn more [here](https://www.npmjs.com/package/googleapis)**
- `multer` package - Multer is a node.js middleware for handling multipart/form-data. **Learn more [here](https://www.npmjs.com/package/multer)**
- `nodemailer` package - Node js module used to send email. **Learn more [here](https://www.npmjs.com/package/nodemailer)**
- `nodecron` package - Create and schedule jobs. **Learn more [here](https://www.npmjs.com/package/cron)**
- `pdf-to-base64` package - Generate a base64 from pdf url. **Learn more [here](https://www.npmjs.com/package/pdf-to-base64)**


###### _devDependencies:_

- `nodemon` package - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. **Learn more [here](https://www.npmjs.com/package/nodemon)**
- `jest` package - Jest is a delightful JavaScript Testing Framework with a focus on simplicity. **Learn more [here](https://jestjs.io/)**
- `ts-jest` package - A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript. **Learn more [here](https://www.npmjs.com/package/ts-jest)**
- `axios` package - Promise based HTTP client for the browser and Node.js. **Learn more [here](https://www.npmjs.com/package/axios)**
- `prettier` package - Prettier is a code formatter and enforces a consistent style. **Learn more [here](https://prettier.io/)**

## Setting up Environment Variables

### _Step 1_

Create a new file in `/api` called `.env`

```
├── api/
│   ├── assets/
│   ├── database/
│   ├── .env <–––
│   ├── index.ts
│   └── ...
├── ui/
└── ...
```

_This is where you will store your environment variables._

### _Step 2_

Add you environment variables:

```
PORT=8080

DB_HOST='localhost'
DB_USER='YOUR USERNAME'
DB_PASSWORD='YOUR PASSWORD'
DB_PORT=3306
DB_DATABASE='YOUR DATABASE'
DB_DIALECT='mysql'

JWT_KEY='secret'
```

## Available Scripts

In the `/api` directory, you can run:

### `npm run build`

- Builds the server for production to the `dist` folder.
- It correctly bundles JavaScript in production mode and optimizes the build for the best performance.
- Your app is ready to be deployed!

### `npm start`

- Runs the server in the development mode.
- Open [http://localhost:8080](http://localhost:8080) to view it in Postman or in the browser.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

### `npm test`

##### (or `npm t`)

- Launches the test runner.
- Generates and displays a test coverage report after tests are run.

### `npm install`

##### (or `npm i`)

- Installs the required dependencies for development.
