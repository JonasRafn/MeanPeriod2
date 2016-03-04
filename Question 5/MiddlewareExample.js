var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var login = require('./routes/login');
var routes = require('./routes/index');
var users = require('./routes/users');
var joke = require('./routes/joke');
var jokes = require('./routes/jokes');
var add = require('./routes/add');
var storeJoke = require('./routes/storeJoke');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret_3162735', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'bower_components')));


app.use(function (req, res, next) {
    console.log(req.url);
    var url = req.url;
    if (url.substr(0, 4) == '/api') {
        return next();
    } else {
        var session = req.session;
        if (session.userName) {
            return next();
        } else {
            if (req.body.userName) {
                session.userName = req.body.userName;
                return res.redirect('/');
            } else {
                req.url = '/login';
                return next();
            }
        }
    }
})
;

app.use('/', routes);
app.use('/login', login);
app.use('/users', users);
app.use('/joke', joke);
app.use('/jokes', jokes);
app.use('/add', add);
app.use('/storeJoke', storeJoke);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
