var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const compression = require('compression');
const cors = require("cors");
const fs = require("fs");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

const apiRoutes = fs.readdirSync(path.join("routes"));

for (let route of apiRoutes) {
  let routeName = route.split(".")[0];
  let routeExt = path.extname(route);
  if (routeExt == ".js" && route != "index.js") {
    app.use("/api/" + routeName, require("./routes/" + routeName));
  }
}

app.use('/*', require('./routes/index'));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;