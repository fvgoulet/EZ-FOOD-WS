var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost/EZ-Food');
// Database

var app = express();



// Make our db accessible to our router
/*app.use(function(req,res,next){
    req = mongoose;
    next();
});*/

var routes = require('./routes/index');
var createAccount = require('./routes/createAccount');
var modifyAccount = require('./routes/modifyAccount');
//var accountManagement = require('./routes/accountManagement');
var manageRestaurateur = require('./routes/manageRestaurateur');
var signIn = require('./routes/signIn');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '1234567890QWERTY'}));

app.use('/', routes);
app.use('/createAccount', createAccount);
app.use('/signIn', signIn);
app.use('/modifyAccount', modifyAccount);
//app.use('/accountManagement', accountManagement);
app.use('/manageRestaurateur', manageRestaurateur);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;