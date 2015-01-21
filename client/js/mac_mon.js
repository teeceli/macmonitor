var temperature;
var humidity;
var lighting;
var statusDate;

var main = function () {
	"use strict";

	$("#who-is-mac").on("click", function () {
		addWhoIsMac();
	});

	$("#home").on("click", function () {
		loadGraph();
	});

	//Display Initial Stats
	$.ajaxSetup({ cache: false });
	$.getJSON("displayCurrentStatus", function (status) {

		if (status.temperature === undefined) {status.temperature = '';}
		if (status.humidity === undefined) {status.humidity = '';}
		if (status.lighting === undefined) {status.lighting = '';}
		if (status.statusDate === undefined) {status.statusDate = '';}
		
		temperature = status.temperature;
		humidity = status.humidity;
		lighting = status.lighting;
		statusDate = status.statusDate;

		var displayTemperature = document.getElementById("temperature-reading-score");
		var textNode = document.createTextNode(temperature);
		displayTemperature.appendChild(textNode);

		var displayHumidity = document.getElementById("humidity-reading-score");
		var textNode = document.createTextNode(humidity);
		displayHumidity.appendChild(textNode);

		var displayLighting = document.getElementById("lighting-reading-score");
		var textNode = document.createTextNode(lighting);
		displayLighting.appendChild(textNode);

		jQuery.timeago(new Date());
		var timeAgo = jQuery.timeago(statusDate);

		var lastChecked = document.getElementById("footer");
		var dateLastChecked = "Conditions last checked " + timeAgo;
		var textNode = document.createTextNode(dateLastChecked);
		lastChecked.appendChild(textNode);

	});
};

function loadGraph() {
	var mainContentElement = document.getElementById('main-square-text-content');
	mainContentElement.innerHTML = '';
}

function addWhoIsMac() {

	var mainContentElement = document.getElementById('main-square-text-content');
	mainContentElement.innerHTML = '';
	var span = document.createElement("span");

	var macPhoto = document.createElement("img");
	macPhoto.src = "../images/mac.png";
	macPhoto.id = "mac-photo";
	mainContentElement.appendChild(macPhoto);

	var macText = "Mac is a one year old Southeastern Box Turtle that we rescued from a bonfire when she was at most a few weeks old. " + 
		"Her nest had unfortunately been destroyed in the fire and we decided to take her in. After some research we realized that turtles take " +
		"an enormous amount of care and fortunately after one year she appears as happy as a turtle can be. This page is set up to monitor the " +
		"living conditions in her terrarium environment. Please read \"How It's Done\" for more info on how this app is set up.";

	var textNode = document.createTextNode(macText);
	textNode.style = "float: right";
	mainContentElement.appendChild(textNode);
}

$(document).ready(main);


/* Sample POST
var temperature = 98.6;
var humidity = 10.0;
var lighting = 11.0;
var newStatus = {"temperature": temperature, "humidity": humidity, "lighting": lighting};

$.post("/updateStatus", newStatus, function (result) {});
*/
