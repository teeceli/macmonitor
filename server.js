var express = require('express');
var	http = require("http");
var	mongoose = require("mongoose");

var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/client'));
app.use(express.urlencoded());

var mongoURI = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/macmonitor';

// Connect to the macmonitor data store in mongo
mongoose.connect(mongoURI);

// Create our Express-powered HTTP server
http.createServer(app).listen(port);

app.get('/', function(request, response) {
  response.send("root");
});

console.log("Listening on " + port);