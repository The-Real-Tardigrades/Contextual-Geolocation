$(document).ready(function () {
    displayAllPeople();
    let locationSelect = $("#selectLocation");
    getLocations();
    $('select').formSelect();
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true
    });

    // A function to get Locations and then render our list of Locations
    function getLocations() {
        $.get("/api/locations", renderLocationList);
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
            displayAllPeople();
        }
        else {
            $.get("/api/locations/" + location, renderTable);
        }
    });

    function renderTable(data) {
        let people = data.People;
        people.forEach(function (person) {
            let newRow = $("<tr>");
            let firstName = $("<td>").text(person.firstName);
            let lastName = $("<td>").text(person.lastName);
            let nickname = $("<td>").text(person.nickname);
            let role = $("<td>").text(person.role);
            let notes = $("<td>").text(person.notes);
            let location = $("<td>").text(data.locationName);
            $("#peopleTable > tbody").append(newRow.append(firstName).append(lastName).append(nickname).append(role).append(notes).append(location));
        });
    };
});


// Retrieve all the stored information for people from database to display on page
function displayAllPeople() {
    $.get("/api/people", function renderAllPeople(data) {
        data.forEach(function (person) {
            let newRow = $("<tr>");
            let firstName = $("<td>").text(person.firstName);
            let lastName = $("<td>").text(person.lastName);
            let nickname = $("<td>").text(person.nickname);
            let role = $("<td>").text(person.role);
            let notes = $("<td>").text(person.notes);
            let location = $("<td>").text(person.Location.locationName);
            $("#peopleTable > tbody").append(newRow.append(firstName).append(lastName).append(nickname).append(role).append(notes).append(location));
        });
    });
}