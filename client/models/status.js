var mongoose = require("mongoose");

// This is our mongoose model for statuses
var StatusSchema = mongoose.Schema({
	temperature: String,
	humidity: String,
	lighting: String,
	statusDate: Date
});

var Status = mongoose.model("Status", StatusSchema);

module.exports = Status;