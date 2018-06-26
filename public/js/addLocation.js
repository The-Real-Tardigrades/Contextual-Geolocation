const labels = '123456789';
let labelIndex = 0;
let map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50, lng: -100 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    map.addListener('click', function (e) {
        placeMarker(e.latLng, map);
        let newLocation = {
            locationName: "test",
            latitude: e.latLng.lat,
            longitude: e.latLng.lng,
            radius: 100
        }

        $.post("/api/locations", newLocation).then(function (data) {
            console.log(data);
        });

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
    let marker = new google.maps.Marker({
        position: latLng,
        label: labels[labelIndex++ % labels.length],
        map: map
    });
    let circle = new google.maps.Circle({
        map: map,
        radius: 100,
        fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');
}