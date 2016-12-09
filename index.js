const express = require('express');

const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wilivery', { server: { auto_reconnect: true } });

const db = mongoose.connection;
db.on('open', () => console.log(`Connected to database ${db.name}`));
db.on('error', err => { console.error(err); process.exit(1); });

let app = express();
app.set('view engine', 'pug');
app.set('port', process.env.PORT || '8080');
// app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('combined'));
app.use(express.static(path.join(__dirname, 'static')));

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
