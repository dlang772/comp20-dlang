var mapCanvas = document.getElementById("map");
var mapOptions = {
    center: new google.maps.LatLng(42.352271, -71.05524200000001), zoom: 11
}
var map = new google.maps.Map(mapCanvas, mapOptions);

var RedlineCoordinates1 = [
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
	{lat: 42.320685, lng: -71.052391},
	{lat: 42.31129, lng: -71.053331},
	{lat: 42.300093, lng: -71.061667},
	{lat: 42.29312583, lng: -71.06573796000001},
	{lat: 42.284652, lng: -71.06448899999999},
]

var Redline1 = new google.maps.Polyline({
	path: RedlineCoordinates1,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
});

var Redline2 = new google.maps.Polyline({
	path: RedlineCoordinates2,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
});

Redline1.setMap(map)+Redline2.setMap(map);


