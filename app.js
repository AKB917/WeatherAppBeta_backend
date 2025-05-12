require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./models/connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const weatherRouter = require('./routes/weather');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);

module.exports = app;
