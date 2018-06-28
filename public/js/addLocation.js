let map, infoWindow, marker;
$(document).ready(function() {
    $('.sidenav').sidenav();
    $("#submit").on("click", function (){
        event.preventDefault();
        
        let newLocation = {
            locationName: $("#newLocation").val().trim(),
            latitude: marker.getPosition().lat(),
            longitude: marker.getPosition().lng(),
            radius: 100
        }
        $.post("/api/locations", newLocation).then(function (data) {
            $("#showUser").text("'" + data.locationName + "' has been added to your locations.");
        });
        $("#newLocation").val("");
        $('.modal').modal();
    });
    $(".dropdown-trigger").dropdown( {
        hover: true
    });
  });

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.850033, lng: -87.6500523 },
        zoom: 4.5
    });
    infoWindow = new google.maps.InfoWindow;

    map.addListener('click', function (e) {
        placeMarker(e.latLng, map);

    });

    $("#findMe").on("click", function () {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
                map.setZoom(15);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
};

function placeMarker(latLng, map) {
    if (marker === undefined){
        marker = new google.maps.Marker({
        position: latLng,
        map: map
        });
    }   
    else {
        marker.setPosition(latLng);
    }
    let circle = new google.maps.Circle({
        map: map,
        radius: 100,
        fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');
};

