var temperature;
var humidity;
var lighting;
var statusDate;
var timeTicks, tempData, humidityData;

var main = function () {

	timeTicks = [[1, "6:30"], [2, "7:00"], [3, "7:30"], [4, "8:00"], [5, "8:30"], [6, "9:00"], [7, "9:30"], [8, "10:00"], [9, "10:30"], [10, "11:00"]];
	tempData = [86,87,95,93,90,81,84,74,66,55];
	humidityData = [55,64,63,67,62,70,71,74,66,67];

	initialPageLoad();

	$("#who-is-mac").on("click", function () {
		addWhoIsMac();
	});

	$("#how-its-done").on("click", function () {
		addHowItsDone();
	});

	$("#home").on("click", function () {

		var mainContentElement = document.getElementById('main-square-text-content');
		mainContentElement.innerHTML = '';
		tempDiv = document.createElement( "div" );
		tempDiv.id = "temp-chart";
		tempDiv.class = "charting";
		 
		humDiv = document.createElement( "div" );
		humDiv.id = "humidity-chart";

		$('#main-square-text-content').append(tempDiv).append("<br />");
		$('#main-square-text-content').append(humDiv);
		$('#temp-chart').css("width", "450px");
		$('#temp-chart').css("height", "200px");
		$('#humidity-chart').css("width", "450px");
		$('#humidity-chart').css("height", "200px");

		displayTemperatureData(tempData, timeTicks);
		displayHumidityChart(humidityData, timeTicks);
	});


	$("#contact-me").on("click", function () {
		addContactMe();
	});


};


function addWhoIsMac() {

	var mainContentElement = document.getElementById('main-square-text-content');
	mainContentElement.innerHTML = '';

	var macPhoto = document.createElement("img");
	macPhoto.src = "../images/mac.png";
	macPhoto.id = "content-photo";
	mainContentElement.appendChild(macPhoto);

	var macText = "Mac is a one year old Southeastern Box Turtle that we rescued from a bonfire when she was at most a few weeks old. " + 
		"Her nest had unfortunately been destroyed in the fire and we decided to take her in. After some research we realized that turtles take " +
		"an enormous amount of care and fortunately after one year she appears as happy as a turtle can be. This page is set up to monitor the " +
		"living conditions in her terrarium environment. Please read \"How It's Done\" for more info on how this app is set up.";

	var textNode = document.createTextNode(macText);
	textNode.style = "float: right";
	mainContentElement.appendChild(textNode);
}


function addHowItsDone() {

	var mainContentElement = document.getElementById('main-square-text-content');
	mainContentElement.innerHTML = '';

	var arduinoPhoto = document.createElement("img");
	arduinoPhoto.src = "../images/arduino.png";
	arduinoPhoto.id = "content-photo";
	mainContentElement.appendChild(arduinoPhoto);

	var arduinoText = "I developed this app to be used as a dashboard for the current living conditions of my turtle terrarium. " + 
		"I am using an Arduino Uno microcontroller with an Ethernet shield that is making HTTP post requests to this website that is backed by a MongoDb database. " + 
		"The Arduino is connected to a temperature sensor, a humidity sensor, and a light sensor and I am gathering these stats every hour. " +
		"I built the site using NodeJs and jQuery and it is hosted for free using Heroku. The code is open source and can be found in my github repository"

	var textNode = document.createTextNode(arduinoText);
	textNode.style = "float: right";
	mainContentElement.appendChild(textNode);
}


function addContactMe() {

	var mainContentElement = document.getElementById('main-square-text-content');
	mainContentElement.innerHTML = '';
	$("#main-square-text-content").append("<div id='contact-form'>Send me a message:")
							 	 .append("<table cellpadding='10px'>")
								 .append("<tr><td><br />Name: <br><input id='contactName' type='text' class='contact-input'></td></tr>") 
								 .append("<tr><td></br />Email Address: <br><input id='contactEmail' type='text' class='contact-input'></td></tr>")
								 .append("<tr><td><br />Message: <br><textarea id='contactMessage' rows='10' cols='35'></textarea></td></tr>")
								 .append("<tr><td><button id='contact-button'>Submit</button><span id='thank-you'></span></td></tr>")
								 .append("</table></div>");

	$("#contact-button").on("click", function () {
		submitContact();
	});
}


function submitContact() {
	var contactName = $("#contactName").val();
	var contactEmail = $("#contactEmail").val();
	var contactMessage = $("#contactMessage").val();

	var newContact = {"contactName": contactName, "contactEmail": contactEmail, "contactMessage": contactMessage};
	
	$.post("/submitContact", newContact, function (result) {

 		$("#contactName").val("");
 		$("#contactEmail").val("");
 		$("#contactMessage").val("");
 		
		$("#contact-button").hide();
 		$('#thank-you').append("Message Sent: Thank you!");
	});

}


function displayTemperatureData(tempData, timeTicks) {
	var tempChart = jQuery.jqplot('temp-chart', [tempData], {
	       title: {
	      	text: 'Temperature Readings (F)',
	      	fontSize: '12pt'
	      },

	      grid: {
	      	backgroundColor: 'darkslategray'
	      },
	    
	      axesDefaults: {
	        labelRenderer: jQuery.jqplot.CanvasAxisLabelRenderer
	      },
	      
	      seriesDefaults: {
	          rendererOptions: {
	              smooth: false
	          }
	      },
	     
	      axes: {
	        xaxis: {
	          pad: 0,
	          ticks: timeTicks
	        },
	        yaxis: {
	        }
	      }
    });
}

function displayHumidityChart(humidityData, timeTicks) {
	var humidityChart = jQuery.jqplot('humidity-chart', [humidityData], {
	       title: {
	      	text: 'Humidity Readings (%)',
	      	fontSize: '12pt'
	      },

	      grid: {
	      	backgroundColor: 'darkslategray'
	      },
	    
	    
	      axesDefaults: {
	        labelRenderer: jQuery.jqplot.CanvasAxisLabelRenderer
	      },
	      
	      seriesDefaults: {
	          rendererOptions: {
	              smooth: false
	          }
	      },
	     
	      axes: {
	        xaxis: {
	          pad: 0,
	          ticks: timeTicks
	        },
	        yaxis: {
	        }
	      }
    });
}


function initialPageLoad() {
	$.ajaxSetup({ cache: false });
	$.getJSON("displayCurrentStatus", function (status) {

		if (status.temperature === undefined) {status.temperature = '';}
		if (status.humidity === undefined) {status.humidity = '';}
		if (status.lighting === undefined) {status.lighting = '';}
		if (status.statusDate === undefined) {status.statusDate = '';}

		temperature = status.temperature + '  F';
		humidity = status.humidity + '%';
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

	displayTemperatureData(tempData, timeTicks);
	displayHumidityChart(humidityData, timeTicks);
}





$(document).ready(main);


/* Sample POST
var temperature = 98.6;
var humidity = 10.0;
var lighting = 11.0;
var newStatus = {"temperature": temperature, "humidity": humidity, "lighting": lighting};

$.post("/updateStatus", newStatus, function (result) {});
*/
