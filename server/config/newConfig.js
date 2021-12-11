const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionConfig = require('./sessionConfig');
const userMiddleware = require('../middleware/user');

// routes
const indexRouter = require('../routes/index.router');

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const config = (app) => {
  app.set('views', path.join(__dirname, '..', 'views'));
  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(cors(corsOptions));
  app.use('/', indexRouter);

  app.use(userMiddleware);
};

module.exports = config;
