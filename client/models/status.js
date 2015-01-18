var mongoose = require("mongoose");

// This is our mongoose model for statuses
var StatusSchema = mongoose.Schema({
	temperature: Number,
	humidity: Number,
	lighting: Number,
	statusDate: Date
});

var Status = mongoose.model("Status", StatusSchema);

module.exports = Status;