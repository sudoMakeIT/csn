var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require("express-session");
var passport = require("passport");
require("./config/auth")(passport);

var indexRouter = require('./routes/index');
var admin = require('./routes/admin');
let aboutPage = require('./routes/about');
let projPage = require('./routes/projetos');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//bodyParser and orders
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoDB
mongoose.Promise = global.Promise;
db = process.env.DB_URL || "mongodb://localhost/cnsDB"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("DB OK");
}).catch((err) => {
  console.log(process.env.DB_URL)
  console.log("DB ERROR, ", err);
});

//session
app.use(session({
  secret: "OG",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes

app.use('/', indexRouter);
app.use('/admin', admin);
app.use('/about', aboutPage);
app.use('/projetos', projPage);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
