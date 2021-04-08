var map;
var currentInfoWindow = null;

let app_id = "c5e04ed9";
let app_key = "46970fda2dfed7dbe461c83764d02533";
let markers = [];
let infowindows = [];
myStorage = window.localStorage;

function searchJobs() {
  //extracts user input to be send a query to Adzuna's Job Search API endpoint
  let results_per_page = 50;
  let search_location = document.getElementById("where").value;
  let country = document.getElementById("country").value;
  
  var paramString = "?app_id=" + app_id + "&app_key=" + app_key + "&results_per_page=" + results_per_page + "&what=&content-type=" + "application/text"
  paramString += "&where=" + search_location + job_type;
  var xhttp = new XMLHttpRequest();
  //deletes preexisting nodes
  xhttp.onreadystatechange = function () {
    count = 0;
	if (this.readyState == 4 && this.status == 200) {
	  deleteMarkers()
      json = JSON.parse(xhttp.response);
	  count = json.count;
      results = json["results"];
	  for (let i in results) {
        search_result = json["results"][i];
        console.log(search_result);
		marker = createMarker(search_result.latitude, search_result.longitude, search_result.title + "\n" + search_result.description)
		markers.push(marker);
		infowindow = createInfoWindow(search_result);
		infowindows.push(infowindow);
		marker.addListener("click", () => {
			if (currentInfoWindow != null) {
				currentInfoWindow = infowindows[i];
				currentInfoWindow.open(map,markers[i]);
			}
			else {
				infowindows[i].open(map,markers[i]);
			}
		});
		marker.setMap(map);
      }
    }
  }
  xhttp.open("GET", "https://api.adzuna.com/v1/api/jobs/" + country + "/search/1" + paramString, true);
  xhttp.send();
}

function deleteMarkers() {
	infowindows.length =0;
	for (marker of markers) { 
		marker.setMap(null);	
	}
	markers.length = 0;
	console.log(markers)
}

function onAddToList(job) {
	if (myStorage.getItem(job.id) == null) {
		myStorage.setItem(job.id, JSON.stringify(job));
		console.log("Added " + job.id);
	}
	else {
		console.log("Error: Already added")
	}
	console.log(job);
}

function createInfoWindow(search_result) {
	const contentString =
	'<div id="content">' + 
    '<div id="infowindow">' +
    '<h1 id="title" class="content_header">' + search_result.title + '</h1>' +
    '<h2 id="company" class="content_header">' + search_result.company.display_name + '</h2>' +
    '<h3 id="category" class="content_header">' + search_result.category.label + '</h3>' +
	'<h4 id="location" class="content_header">' + search_result.location.display_name + '</h3>' +
    '<div id="description" class="content_header">' +
    '<p>' + search_result.description + '</p>' +
    '<p><a href="' + search_result.redirect_url + '">Apply Here</a></p>'+
	"</div>" +
	'<button id="addbutton" onclick="onAddToList(' + JSON.stringify(search_result) + ')"></button>'
    "</div>" +
	"</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  return infowindow;
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
	center: { lat: 40.040870, lng: -75.071380 },
	zoom: 16,
  });
  var lat_lng = new google.maps.LatLng(40.040870, -75.071380);
}

function createMarker(lat, lng) {
  var lat_lng = new google.maps.LatLng(lat, lng);
  marker = new google.maps.Marker({
    position: lat_lng,
    title: search_result.title,
  });
  return marker;
}