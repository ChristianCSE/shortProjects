'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const myRouter = require('./routes/routes.js');

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));
app.engine('.html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', myRouter);

module.exports = app;
