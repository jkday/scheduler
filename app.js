var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var session = require("express-session");
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scheduleRouter = require('./routes/scheduler');

// adding public routs. 
var publicDirectory = path.join(process.cwd(), 'public');
console.log("Public path at: " + publicDirectory);
//console.log("Public path at: " + __dirname)

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), publicDirectory]);
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(publicDirectory, {
    maxAge: 0,
}));

app.set('view engine', 'ejs');

app.disable('view cache');

// adding request locals.
app.use(function(req, res, next) {
    res.locals.req = req;
    next();
});

app.use(logger('dev'));

app.use(bodyParser.text());
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var db = {};
var connect2DB = function(db, retries) {

    var attempt = retries || 1;
    //    db = mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true }).then(() => {

    db = mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {

        if (attempt <= 3) {
            console.error(`Could not connect to the database on attempt ${attempt} of 3.\n Retrying shortly... \n${err}`);
            attempt++;
            setTimeout(() => { let j = 1 + 1 }, 500); //give the MongoDB a chance to start up (.5 sec pause)
            connect2DB(db, attempt);
            return;
        } else {
            //exit the entire node app if a connection cannot be made to DB
            console.error('Could not connect to the database. Exiting now...', err);
            process.exit();
        }
    });

};
connect2DB(db);

/*
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
    }));
    */

app.get('/', indexRouter);
app.get('/apptList', function(req, res) {

    res.render('apptList', { title: "Appointment Results" });

});

app.all('/users', usersRouter);
app.all('/scheduler(/*)?', scheduleRouter);


// static file viewer... remove later
//app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;