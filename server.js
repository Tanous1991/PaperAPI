var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/paperModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pdsdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// in NodeJS/Express (server)
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();

});

var routes = require('./api/routes/paperRoute'); //importing route
routes(app); //register the route

app.listen(port);

console.log("\x1b[33m","--info-- Paper RESTful API server started on: " + port);
