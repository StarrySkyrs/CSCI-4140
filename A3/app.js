var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var clientRouter = require('./routes/client.routes');
var lineRouter = require('./routes/line.routes');
var partRouter = require('./routes/part.routes');
var purchaseOrderRouter = require('./routes/order.routes');
var clientService = require('./routes/service.client.routes');
var agentService = require('./routes/service.agent.routes');
var authService = require('./routes/auth.routes');

var app = express();

// view engine setup
// app.use(function(req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors()) // Use this after the variable declaration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/clients', clientRouter);
app.use('/parts', partRouter);
app.use('/lines', lineRouter);
app.use('/pos', purchaseOrderRouter);
app.use('/client', clientService);
app.use('/agent', agentService)
app.use('/auth', authService);

app.use('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
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
