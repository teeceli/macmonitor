var Status = require("../models/status.js");
var MacController = {};


MacController.displayCurrentStatus = function (req, res) {
	console.log("*** Displaying Current Mac Status:");

	Status.findOne({ $query: {}, $orderby: { statusDate : -1 }}, function (err, status) {
		//var jsonStatus = JSON.stringify(status);
		//console.log("status: " + jsonStatus);
		console.log("statusDate: " + status.statusDate);

		// res.json returns the entire object as a JSON file
		res.json(status);

	});
};


MacController.updateStatus = function (req, res) {
	
	var date = new Date();
	console.log("*** Updating Mac Status:");
	console.log("*** temperature: " + req.body.temperature);
	console.log("*** humidity: " + req.body.humidity);
	console.log("*** lighting: " + req.body.lighting);
	console.log("*** statusDate: " + date.toISOString());

	var status = new Status({"temperature":req.body.temperature, "humidity":req.body.humidity, "lighting":req.body.lighting, "statusDate":date.toISOString()});
	status.save(function (err, result) {
		if (err !== null) {
			console.log("###ERROR: " + err);
			res.send("ERROR");
		} else {
		
			// our client expects *all* of the todo items to be returned,
			// so we do an additional request to maintain compatibility
			Status.find({}, function (err, result) {
				if (err !== null) {
					// the element did not get saved!
					console.log("###ERROR2: " + err);

					res.send("ERROR");
				}
				res.json(result);
			});
			
		}
	});
};

module.exports = MacController;