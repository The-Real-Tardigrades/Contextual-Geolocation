$(document).ready(function() {
    // materialize initializations
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown( {
        hover: true
    });
});

// Initialize the google map.
let map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.850033, lng: -87.6500523 },
        zoom: 4.5
    });
    infoWindow = new google.maps.InfoWindow;
    getLocations();

    // Use HTML5 geolocation to find the user when they navigate to the page and zoom in on their location.
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(15);

            // Checks to see if the user is located in one of their saved locations and if so, displays
            // the information the user has saved for that location.
            $("#locationDetails").empty();
            $.get("/api/locations", function (data) {
                for (let i = 0; i < data.length; i++) {
                let latLng = { lat: Number(data[i].latitude), lng: Number(data[i].longitude) };
                if(checkDistance(pos, latLng)) {
                    console.log(data[i]);
                    $("#locationDetails").empty();
                    let foundData = $("<div class='foundData'>");
                    for(let j = 0; j < data[i].People.length; j++) {
                        let personObj = data[i].People[j];
                        let info = $("<a class='waves-effect waves-light btn modal-trigger moreInfo' href='#personInfo'>").
                        text(data[i].People[j].firstName + " " + data[i].People[j].lastName + " - " + data[i].People[j].role);
                        info.data(personObj);
                        foundData.append(info);
                    }
                    $("#locationDetails").append(foundData);
                    $(".moreInfo").on("click", function(){
                        let person = $(".moreInfo").data();
                        let title = $("<h5>");
                        title.text(person.firstName + " " + person.lastName);
                        let nickName = $("<p>").text("Nickname: " + person.nickname);
                        let jobrole = $("<p>").text("Role: " + person.role);
                        let notesOnPerson = $("<p>").text("Notes: " + person.notes);
                        $(".modal-content").append(title).append(nickName).append(jobrole).append(notesOnPerson);
                        
                        $('.modal').modal();
                    });
                }
                // else {
                //     $("#locationDetails").empty();
                // };
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

// Get all of the user's saved locations and place markers on the map for each location.
function getLocations() {
    $.get("/api/locations", function (data) {
        for (let i = 0; i < data.length; i++) {
            let latLng = { lat: Number(data[i].latitude), lng: Number(data[i].longitude) };
            placeMarker(latLng, map);
            let newRow = $("<tr>");
            newRow.text(data[i].locationName);
            $("#locationsTable > tbody").append(newRow);
        }
    });
}

// The function that places a marker at the user's saved locations.
function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    let circle = new google.maps.Circle({
        map: map,
        radius: 100,
        fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');
}

// Computes to see if the user is located within 100 units of one of their saved locations.
function checkDistance(userLocation, markerLocation) {
    let userCoords = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    let markerCoords = new google.maps.LatLng(markerLocation.lat, markerLocation.lng);
    if (google.maps.geometry.spherical.computeDistanceBetween(userCoords, markerCoords) <= 100) {
        return true;
    }
    
    return false;
}

