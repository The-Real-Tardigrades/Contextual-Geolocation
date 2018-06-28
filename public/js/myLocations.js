$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown( {
        hover: true
    });
  });


var labels = '123456789';
var labelIndex = 0;

var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.850033, lng: -87.6500523 },
        zoom: 4.5
    });
    infoWindow = new google.maps.InfoWindow;
    getLocations();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(12);
            $.get("/api/locations", function (data) {
                for (var i = 0; i < data.length; i++) {
                var latLng = { lat: Number(data[i].latitude), lng: Number(data[i].longitude) };
                if(checkDistance(pos, latLng)) {
                    console.log(data[i]);
                    // let info = $("<p>");
                    // info.text(data[i]);
                    // $("#locationDetails").append(info);
                };
        }
    });
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
}

function getLocations() {
    $.get("/api/locations", function (data) {
        for (var i = 0; i < data.length; i++) {
            var latLng = { lat: Number(data[i].latitude), lng: Number(data[i].longitude) };
            placeMarker(latLng, map);
            let newRow = $("<tr>");
            newRow.text(data[i].locationName);
            $("#locationsTable > tbody").append(newRow);
        }
    });
}

function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        label: labels[labelIndex++ % labels.length],
        map: map
    });
    var circle = new google.maps.Circle({
        map: map,
        radius: 100,
        fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');
}

function checkDistance(userLocation, markerLocation) {
    var userCoords = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    var markerCoords = new google.maps.LatLng(markerLocation.lat, markerLocation.lng);
    if (google.maps.geometry.spherical.computeDistanceBetween(userCoords, markerCoords) <= 100) {
        return true;
    }
    
    return false;
}

