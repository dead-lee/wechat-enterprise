//var http = require("http");
var wechat = require('./wechat'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
/*app.use(function(req, res){
 console.log("[Incoming connection]: "+req.url);
 wechat.process(req, res);
 });*/

app.route('*').all(function(req, res, next) {
    wechat.process(req, res);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
