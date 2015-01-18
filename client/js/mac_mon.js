

// Display Content Title
var displayTitle = document.getElementById("mac-check-title");
var textNode = document.createTextNode("#### Checking Macs Status ####");
var delayParam = 500;
delayDisplay(displayTitle, textNode, delayParam);


// Calculate Temperature
var displayTemp = document.getElementById("mac-temperature");
var textNode = document.createTextNode("/checking temperature... ");
var delayParam = 1000;
delayDisplay(displayTemp, textNode, delayParam);

var displayTempRating = document.getElementById("mac-temperature");
var textNode = document.createTextNode("good");
var delayParam = 2000;
delayDisplay(displayTempRating, textNode, delayParam);


// Calculate Humidity
var displayHumidity = document.getElementById("mac-humidity");
var textNode = document.createTextNode("/checking humidity... ");
var delayParam = 3000;
delayDisplay(displayHumidity, textNode, delayParam);

var displayHumidityRating = document.getElementById("mac-humidity");
var textNode = document.createTextNode("good");
var delayParam = 4000;
delayDisplay(displayHumidityRating, textNode, delayParam);


// Calculate Light
var displayLight = document.getElementById("mac-sunlight");
var textNode = document.createTextNode("/checking sunlight... ");
var delayParam = 5000;
delayDisplay(displayLight, textNode, delayParam);

var displayLightRating = document.getElementById("mac-sunlight");
var textNode = document.createTextNode("good");
var delayParam = 6000;
delayDisplay(displayLightRating, textNode, delayParam);



// Calculate Health
var displayHealth = document.getElementById("mac-overall-health");
var textNode = document.createTextNode("Macs overall health is: ");
var delayParam = 7000;
delayDisplay(displayHealth, textNode, delayParam);

var displayHealthRating = document.getElementById("mac-overall-health");
var textNode = document.createTextNode("good");
var delayParam = 8000;
delayDisplay(displayHealthRating, textNode, delayParam);

var temperature = 98.6;
var humidity = 10.0;
var sunlight = 11.0;
var newStatus = {"temperature": temperature, "humidity": humidity, "lighting": sunlight};
	
$.post("/updateStatus", newStatus, function (result) {
	console.log("newStatus: " + newStatus);
});

//var mainContent = document.getElementById("main-square-text-content");
//mainContent.innerHTML = "";




function delayDisplay(element, textNode, delayParam) {
	window.setTimeout(function(){
		element.appendChild(textNode);
	}, delayParam);
}
