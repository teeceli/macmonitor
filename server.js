var express = require('express');
var	http = require("http");
var	mongoose = require("mongoose");
//var bodyParser  = require('body-parser');
var MacController = require("./client/controllers/mac_controller.js");

console.log("################# Deploying #################");

var port = process.env.PORT || 3000;
console.log("setting up port: " + port);

var app = express();

app.use(express.static(__dirname + '/client'));
/*
app.use(bodyParser.urlencoded({
  extended: true
}));
*/
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

//app.get("/messages.json", MessageController.listStatus); 
app.post("/updateStatus", MacController.updateStatus);

console.log("Listening on " + port);