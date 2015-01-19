var temperature;
var humidity;
var lighting;

$.ajaxSetup({ cache: false });
$.getJSON("displayCurrentStatus", function (status) {

	if (status.temperature === undefined) {status.temperature = '';}
	if (status.humidity === undefined) {status.humidity = '';}
	if (status.lighting === undefined) {status.lighting = '';}
	if (status.statusDate === undefined) {status.statusDate = '';}
	
	temperature = status.temperature;
	humidity = status.humidity;
	lighting = status.lighting;

	var displayTemperature = document.getElementById("temperature-reading-score");
	var textNode = document.createTextNode(temperature);
	displayTemperature.appendChild(textNode);

	var displayHumidity = document.getElementById("humidity-reading-score");
	var textNode = document.createTextNode(humidity);
	displayHumidity.appendChild(textNode);

	var displayLighting = document.getElementById("lighting-reading-score");
	var textNode = document.createTextNode(lighting);
	displayLighting.appendChild(textNode);

});





/* Sample POST
var temperature = 98.6;
var humidity = 10.0;
var lighting = 11.0;
var newStatus = {"temperature": temperature, "humidity": humidity, "lighting": lighting};

$.post("/updateStatus", newStatus, function (result) {});
*/
