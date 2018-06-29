$(document).ready(function() {
    let locationSelect = $("#selectLocation");
    getLocations();
    $('select').formSelect();
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true
    });

    $("#submitButton").on("click", function () {
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
            console.log(data);
        })

       /* $("#firstName").val(""); 
        $("#lastName").val("");
        $("#nickname").val("");
        $("#job").val("");
        $("#notes").val(""); */
    });

    // A function to get Locations and then render our list of Locations
    function getLocations() {
        $.get("/api/locations", renderLocationList);
    }
    // Function to either render a list of locations
    function renderLocationList(data) {
        let rowsToAdd = [];
        for (let i = 0; i < data.length; i++) {
            rowsToAdd.push(createLocationRow(data[i]));
        }
        locationSelect.empty();
        console.log(rowsToAdd);
        console.log(locationSelect);
        locationSelect.append(rowsToAdd);
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
