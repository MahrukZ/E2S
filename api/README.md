
# Getting Started

## Installing NPM Packages

### *Step 1*
Change directory to `/api` :
```
cd /api
```

### *Step 2*
Copy and paste the below command to install the required dependencies:
```
npm i express mysql2 sequelize sequelize-typescript cors dotenv nodemon jest ts-jest supertest typescript @types/cors @types/express @types/node @types/mysql @types/jest @types/supertest --save
```

- `express` package - Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org/). **Learn more [here](https://www.npmjs.com/package/express)**
- `mysql2` package - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl [much more](https://github.com/sidorares/node-mysql2/tree/master/documentation). **Learn more [here](https://www.npmjs.com/package/mysql2)**
- `sequelize` package - Sequelize is an easy-to-use and promise-based Node.js ORM tool. It features solid transaction support, relations, eager and lazy loading, read replication and more. **Learn more [here](https://www.npmjs.com/package/sequelize)**
- `cors` package - CORS is a node.js package for providing a [Connect](http://www.senchalabs.org/connect/)/[Express](http://expressjs.com/) middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options. **Learn more [here](https://www.npmjs.com/package/cors)**
-`dotenv` package - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). **Learn more [here](https://www.npmjs.com/package/dotenv)**
- `nodemon` package - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. **Learn more [here](https://www.npmjs.com/package/nodemon)**
- `jest` package - Jest is a delightful JavaScript Testing Framework with a focus on simplicity. **Learn more [here](https://jestjs.io/)**
- `ts-jest` package - A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript. **Learn more [here](https://www.npmjs.com/package/ts-jest)**
- `supertest` package - The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent. **Learn more [here](https://www.npmjs.com/package/supertest)**
- `typescript` package - [TypeScript](https://www.typescriptlang.org/) is a language for application-scale JavaScript. **Learn more [here](https://www.npmjs.com/package/typescript)** 

## Environment Variables

### *Step 1*
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
*This is where you will store your environment variables.*

### *Step 2*
Add you environment variables:

```
PORT=8080

DB_HOST='localhost'
DB_USER='YOUR USERNAME'
DB_PASSWORD='YOUR PASSWORD'
DB_PORT=3306
DB_DATABASE='YOUR DATABASE'
DB_DIALECT='mysql'
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

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
