$(document).ready(function () {
    $.get("/api/users/" + localStorage.getItem("userId"))
        .then(res => displayAllPeople(res.People,res.Locations));
    let locationSelect = $("#selectLocation");
    getLocations();
    $('select').formSelect();
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true
    });

    // A function to get Locations and then render our list of Locations
    function getLocations() {
        $.get("/api/users/" + localStorage.getItem("userId"))
            .then(res => renderLocationList(res.Locations));
    }
    // Function to either render a list of locations
    function renderLocationList(data) {
        const chooseRow = $("<option value='' disabled selected>");
        chooseRow.text("Filter by Location");
        const allOption = $("<option>").text("All");
        let rowsToAdd = [];
        for (let i = 0; i < data.length; i++) {
            rowsToAdd.push(createLocationRow(data[i]));
        }
        locationSelect.empty();
        locationSelect.append(rowsToAdd);
        locationSelect.append(allOption);
        locationSelect.prepend(chooseRow);
        $('select').formSelect();
    }

    // Creates the location options in the dropdown
    function createLocationRow(location) {
        let listOption = $("<option>");
        listOption.attr("value", location.id);
        listOption.data(location);
        listOption.text(location.locationName);
        return listOption;
    };

    $("#submit").on("click", function() {
        const location = locationSelect.val();
        $("tbody").empty();
        if(location === "All" || location === null) {
            $.get("/api/users/" + localStorage.getItem("userId"))
                .then(res => displayAllPeople(res.People, res.Locations));
        }
        else {
            $.get("/api/users/" + localStorage.getItem("userId"))
                .then(res => {
                    const people = res.People;
                    const onesToDisplay = [];
                    for(let i = 0; i < people.length; i++) {
                        if(people[i].LocationId === parseInt(location)) {
                            onesToDisplay.push(people[i]);
                        }
                    }
                    displayAllPeople(onesToDisplay, res.Locations)}
                );
        }
    });
});


// Retrieve all the stored information for people from database to display on page
function displayAllPeople(peopleArr, locationsArr) {
    const locations = locationsArr;

    peopleArr.forEach(function (person) {
        let newRow = $("<tr>");
        let firstName = $("<td>").text(person.firstName);
        let lastName = $("<td>").text(person.lastName);
        let nickname = $("<td>").text(person.nickname);
        let role = $("<td>").text(person.role);
        let notes = $("<td>").text(person.notes);
        let location;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].id === person.LocationId) {
                location = $("<td>").text(locations[i].locationName);
            }
        }
        $("#peopleTable > tbody").append(newRow.append(firstName).append(lastName).append(nickname).append(role).append(notes).append(location));
    });
}