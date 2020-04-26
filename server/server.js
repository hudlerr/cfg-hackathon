const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/handler.js');
const path = require('path');
const session = require('express-session');

const app = express();

//uses sessions for user
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
// Parses the request payload (if JSON) before the request goes to the handler
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(
    express.static(path.join(__dirname, '..', 'public'), { maxAge: '30d' })
);

app.use(routes);

module.exports = app;