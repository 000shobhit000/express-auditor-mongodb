# express-auditor-mongodb

An auditor for express requests-responses and store them in mongodb

## Installation

Install this package in your [NodeJS](https://nodejs.org/) project

```bash
$ npm i express-auditor-mongodb
```

## Getting started

Just import middleware and use it like this

```js
import { Auditor } from "express-auditor-mongodb";

// make sure to use this route before your route handlers.
app.use(Auditor("Your mongoClient object"));
```

## Example

Importing a auditor instance

```js
import express from "express";
import { Auditor } from "express-auditor-mongodb";

const app = express();

// setup the body/response types to auditor catch him
app.use(express.json());

// the handler object return is the express middleware
app.use(handler);

// Place your auditor before your route handler.
app.use(Auditor("Your mongoClient object"));

// This will be the default schema used to store audit data ->
// statusCode, urlPath, body, query, responseBody, userAgent, ipAddress, createdAt

/*
  routes, middlewares, ...etc
*/

app.listen(3000, () => console.log("app is running"));
```
