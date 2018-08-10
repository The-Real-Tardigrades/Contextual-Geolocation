let map, infoWindow, marker;
$(document).ready(function() {
    $('.sidenav').sidenav();

    // When user adds a location, the location gets saved to /api/locations and a modal pops up
    // letting the user know that the location has been saved
    $("#submit").on("click", function (){
        
        const newLocation = {
            locationName: $("#newLocation").val().trim(),
            latitude: marker.getPosition().lat(),
            longitude: marker.getPosition().lng(),
            radius: 100,
            UserId: localStorage.getItem("userId")
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

// Initialize google maps
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
        // Use HTML5 geolocation to locate user if they click the find my location button.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
                map.setZoom(17);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
};

// Function to place marker where user clicks
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
    // Bind a circle to the marker that is placed by user so they can see the radius of the location they are saving
    const circle = new google.maps.Circle({
        map: map,
        radius: 100,
        fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');
};

