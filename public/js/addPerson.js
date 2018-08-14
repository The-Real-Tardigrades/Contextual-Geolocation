$(document).ready(function () {

    let locationSelect = $("#selectLocation");
    getLocations();
    // Materialize initializations
    $('select').formSelect();
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true
    });

    $("#submit").on("click", function () {

        event.preventDefault();

        // Create a new person object to save to the user's database of people
        const newPerson = {
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            nickname: $("#nickname").val().trim(),
            role: $("#job").val().trim(),
            notes: $("#notes").val(),
            LocationId: locationSelect.val(),
            UserId: localStorage.getItem("userId")
        }

        submitPerson(newPerson);
    
        // Clear the form after a person is added.
        $("#firstName").val("");
        $("#lastName").val("");
        $("#nickname").val("");
        $("#job").val("");
        $("#notes").val("");
        $('.modal').modal();
    });
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
        $('select').empty();
        const chooseRow = $("<option value='' disabled selected>");
        chooseRow.text("Choose a Location");
        const rowsToAdd = [];
        for (let i = 0; i < data.length; i++) {
            rowsToAdd.push(createLocationRow(data[i]));
        }
        locationSelect.empty();
        locationSelect.append(rowsToAdd);
        locationSelect.prepend(chooseRow);
        $('select').formSelect();
    }

    // Creates the location options in the dropdown
    function createLocationRow(location) {
        const listOption = $("<option>");
        listOption.attr("value", location.id);
        listOption.text(location.locationName);
        return listOption;
    }

    // Function to submit new person and save them in database
    function submitPerson(person) {
        $.post("/api/people", person, function() {
            $("#showAdded").text("'" + person.firstName + "' has been added to your circle.");
          });
    }
});