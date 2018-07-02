$(document).ready(function () {
    let locationSelect = $("#selectLocation");
    getLocations();
    $('select').formSelect();
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true
    });

    $("#submit").on("click", function () {
        event.preventDefault();
        let newPerson = {
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            nickname: $("#nickname").val().trim(),
            role: $("#job").val().trim(),
            notes: $("#notes").val(),
            LocationId: locationSelect.val()
        }
        $.post("/api/people", newPerson).then(function (data) {
            $("#showAdded").text("'" + data.firstName + "' has been added to your circle.");
            console.log(data);
        });
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
        $.get("/api/locations", renderLocationList);
    }
    // Function to either render a list of locations
    function renderLocationList(data) {
        $('select').empty();
        const chooseRow = $("<option value='' disabled selected>");
        chooseRow.text("Choose a Location");
        let rowsToAdd = [];
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
        let listOption = $("<option>");
        listOption.attr("value", location.id);
        listOption.text(location.locationName);
        return listOption;
    }
});