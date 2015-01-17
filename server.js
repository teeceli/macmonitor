var express = require('express');
var	http = require("http");
var	mongoose = require("mongoose");

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/client'));

var mongoURI = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/macmonitor';

// Connect to the amazerrific data store in mongo
mongoose.connect(mongoURI);

// Create our Express-powered HTTP server
http.createServer(app).listen(port);

app.get('/', function(request, response) {
  response.send("root");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});