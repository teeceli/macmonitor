var Status = require("../models/status.js");
var Contact = require("../models/contact.js");
var MacController = {};


MacController.displayCurrentStatus = function (req, res) {

	Status.findOne({ $query: {}, $orderby: { statusDate : -1 }}, function (err, status) {
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

MacController.submitContact = function (req, res) {
	
	var date = new Date();
	console.log("*** Submitting Contact:");
	console.log("*** name: " + req.body.contactName);
	console.log("*** email: " + req.body.contactEmail);
	console.log("*** message: " + req.body.contactMessage);
	console.log("*** contactDate: " + date.toISOString());

	var contact = new Contact({"contactName":req.body.contactName, "contactEmail":req.body.contactEmail, 
		"contactMessage":req.body.contactMessage, "contactDate":date.toISOString()});

	contact.save(function (err, result) {
		if (err !== null) {
			console.log("###ERROR: " + err);
			res.send("ERROR");
		} else {
		
			// our client expects *all* of the todo items to be returned,
			// so we do an additional request to maintain compatibility
			Contact.find({}, function (err, result) {
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