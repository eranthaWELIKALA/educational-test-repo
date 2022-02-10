require('dotenv').config()
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const keycloakConfig = require('./config/keycloak.config');
const errorHandlerService = require('./services/errorHandlerService');

var indexRouter = require('./routes/index');

var app = express();
var cors = require('cors');
var memoryStore = new session.MemoryStore();
var keycloak = keycloakConfig.initKeycloak(memoryStore);
app.use(session({ secret: 'user-service', resave: false, saveUninitialized: true, store: memoryStore }));
app.use(keycloak.middleware());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(errorHandlerService);

module.exports = app;
