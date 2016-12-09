global.Promise = require('bluebird');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const passport = require('passport');
const connect = require('connect-mongo');
const session = require('express-session');
const validator = require('express-validator');
const flash = require('connect-flash-plus');
const secret = require('./config/secret');

app.use(validator());
app.use(compression());
app.use(logger('combined'));

app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('port', process.env.PORT || '7878');
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/wilivery', { server: { auto_reconnect: true } });

const db = mongoose.connection;
db.on('error', err => console.error(err));
db.on('open', () => {
    const store = new (new connect(session))({ mongooseConnection: db });
    console.log(`Connected to database ${db.name}`);

    app.use(session({
        secret, store, cookie: { maxAge: 12 * 60 * 60 * 1000 }, //12h
        key: 'wilivery.sid', resave: false, saveUninitialized: false }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    require('./app/auth')(passport);
    require('./routes')(app, passport);
    require('./data/populate')();

    app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
});
