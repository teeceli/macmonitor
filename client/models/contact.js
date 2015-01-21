var mongoose = require("mongoose");

// This is our mongoose model for statuses
var ContactSchema = mongoose.Schema({
	contactName: String,
	contactEmail: String,
	contactMessage: String,
	contactDate: Date
});

var Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;