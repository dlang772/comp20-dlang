var mapCanvas = document.getElementById("map");
var mapOptions = {
    center: new google.maps.LatLng(42.352271, -71.05524200000001), zoom: 11
}
var map = new google.maps.Map(mapCanvas, mapOptions);
var myLat;
var myLong;

function logLocation(pos) {
	var crds = pos.coords;
	myLat = crds.latitude;
	myLong = crds.longitude;

    var meMarker = new google.maps.Marker({
      position: {lat: myLat, lng: myLong},
      map: map,
    });

};

navigator.geolocation.getCurrentPosition(logLocation);

var RedlineCoordinates1 = [
	{position: {lat: 42.395428, lng: -71.142483}, stopName: "Alewife"},
	{position: {lat: 42.39674, lng: -71.121815}, stopName: "Davis"},
    {position: {lat: 42.3884, lng: -71.11914899999999}, stopName: "Porter Square"},
    {position: {lat: 42.373362, lng: -71.118956}, stopName: "Harvard Square"},
    {position: {lat: 42.365486, lng: -71.103802}, stopName: "Central Square"},
    {position: {lat: 42.36249079, lng: -71.08617653}, stopName: "Kendall/MIT"},
    {position: {lat: 42.361166, lng:  -71.070628}, stopName: "Charles/MGH"},
    {position: {lat: 42.35639457, lng: -71.0624242}, stopName: "Park Street"},
    {position: {lat: 42.355518, lng: -71.060225}, stopName: "Downtown Crossing"},
	{position: {lat: 42.352271, lng: -71.05524200000001}, stopName: "South Station"},
    {position: {lat: 42.342622, lng: -71.056967}, stopName: "Broadway"},
    {position: {lat: 42.330154, lng: -71.057655}, stopName: "Andrew"},
    {position: {lat: 42.320685, lng: -71.052391}, stopName: "JFK/UMass"},
    {position: {lat: 42.275275, lng: -71.0203369}, stopName: "North Quincy"},
    {position: {lat: 42.2665139, lng: -71.029583}, stopName: "Wollaston"},
    {position: {lat: 42.251809, lng: -71.005409}, stopName: "Quincy Center"},
    {position: {lat: 42.233391, lng: -71.007153}, stopName: "Quincy Adams"},
    {position: {lat: 42.2078543, lng:  -71.0011385}, stopName: "Braintree"},
]
   
var Redline1coords = [
	{lat: 42.395428, lng: -71.142483},
	{lat: 42.39674, lng: -71.121815},
    {lat: 42.3884, lng: -71.11914899999999},
    {lat: 42.373362, lng: -71.118956},
    {lat: 42.365486, lng: -71.103802},
    {lat: 42.36249079, lng: -71.08617653},
    {lat: 42.361166, lng:  -71.070628},
    {lat: 42.35639457, lng: -71.0624242},
    {lat: 42.355518, lng: -71.060225},
	{lat: 42.352271, lng: -71.05524200000001},
    {lat: 42.342622, lng: -71.056967},
    {lat: 42.330154, lng: -71.057655},
    {lat: 42.320685, lng: -71.052391},
    {lat: 42.275275, lng: -71.0203369},
    {lat: 42.2665139, lng: -71.029583},
    {lat: 42.251809, lng: -71.005409},
    {lat: 42.233391, lng: -71.007153},
    {lat: 42.2078543, lng:  -71.0011385}
]

var RedlineCoordinates2 = [
	{position: {lat: 42.320685, lng: -71.052391}, stopName: "JFK/UMass"},
	{position: {lat: 42.31129, lng: -71.053331}, stopName: "Savin Hill"},
	{position: {lat: 42.300093, lng: -71.061667}, stopName: "Fields Corner"},
	{position: {lat: 42.29312583, lng: -71.06573796000001}, stopName: "Shawmut"},
	{position: {lat: 42.284652, lng: -71.06448899999999}, stopName: "Ashmont"},
]

var Redline2coords = [
	{lat: 42.320685, lng: -71.052391},
	{lat: 42.31129, lng: -71.053331},
	{lat: 42.300093, lng: -71.061667},
	{lat: 42.29312583, lng: -71.06573796000001},
	{lat: 42.284652, lng: -71.06448899999999},
]

var Redline1 = new google.maps.Polyline({
	path: Redline1coords,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
});

var Redline2 = new google.maps.Polyline({
	path: Redline2coords,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
});


for (var i = 0; i < 18; i++) {
	setupMarker(i, RedlineCoordinates1);
};

for (var i = 0; i < 5; i++) {
	setupMarker(i, RedlineCoordinates2);
};

var infowindow = new google.maps.InfoWindow({
	content: "No train"
});

function setupMarker (index, array) {
	var image = 'marker.jpg';

    var mapMarker = new google.maps.Marker({
      position: array[index].position,
      map: map,
      icon: image
    });

    mapMarker.addListener('click', function() {
		parse(array[index].stopName);
		infowindow.open(map, mapMarker);
	});

    mapMarker.setMap(map);

}

Redline1.setMap(map)+Redline2.setMap(map);




function parse(stopName){
	var xmlhttp = new XMLHttpRequest();
	var url = "https://warm-fortress-73167.herokuapp.com/redline.json";

	xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var parseData = JSON.parse(xmlhttp.responseText);
        printData(parseData, stopName);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function printData(parseData, stopName) {
	var trainTimes = "";
	var triplist = parseData.TripList;
 	var line = triplist.Line;
 	var trips = triplist.Trips;
 	var currTime = triplist.CurrentTime;
 	var trainInfo = "";


	for (i in trips) {
		var predictions = trips[i].Predictions
		for (j in predictions) {
			if (stopName == predictions[j].Stop) {
				trainInfo += "<div>Wait time for "+predictions[j].Stop+" towards "+trips[i].Destination+" is "+predictions[j].Seconds+" seconds.</br></div>";
			}
			// if (stopName != predictions[j].Stop) {
			// 	trainInfo += "Train Passed.";
			// 	infowindow.setContent(trainInfo);
			// }
			// infowindow.setContent(trainInfo);
			
		}
		
	    infowindow.setContent(
	    	trainInfo
	    );
		
    }
 	
}


