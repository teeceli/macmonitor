var Status = require("../models/status.js");
var MacController = {};

MacController.updateStatus = function (req, res) {
	var date = new Date();
	var newStatus = new Status({"temperature":req.body.temperature, "humidity":req.body.humidity, "lighting":req.body.lighting, "statusDate":date.toISOString()});

	newStatus.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
		
			// our client expects *all* of the todo items to be returned,
			// so we do an additional request to maintain compatibility
			Status.find({}, function (err, result) {
				if (err !== null) {
					// the element did not get saved!
					res.send("ERROR");
				}
				res.json(result);
			});
			
		}
	});
};