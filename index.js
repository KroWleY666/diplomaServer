const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')

const createError = require('http-errors');



// Set up the express app
const app = express();


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//проверка входа
require('./server/config/passport')(passport)
//app.use(express.json())
//sessions
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//require('./app/routes.js')(app, passport)

app.use((req, res, next) => {
  //res.locals.success_msg = req.flash('success_msg')
  //res.locals.error_msg = req.flash('error_msg')
  //res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

/*app.use(function(req, res, next) {
  next(createError(404));
});*/


require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;