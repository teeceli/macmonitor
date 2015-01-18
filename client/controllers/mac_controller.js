var Status = require("../models/status.js");
var MacController = {};

MacController.updateStatus = function (req, res) {
	var date = new Date();
		//console.log("*** status: " + req.body.temperature + " " + req.temperature);
		console.log("statusDate: " + date.toISOString());

	var status = new Status({"temperature":req.temperature, "humidity":req.humidity, "lighting":req.lighting, "statusDate":date.toISOString()});
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