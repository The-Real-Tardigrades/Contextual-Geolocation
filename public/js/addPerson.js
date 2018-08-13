$(document).ready(function () {
    var url = window.location.search;
    var personId;
    var updating = false;

    if (url.indexOf("?person_id=") !== -1) {
        personId = url.split("=")[1];
        getPersonData(personId);
    }

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

        if(updating) {
            newPerson.id = personId;
            updatePerson(newPerson);
        }

        else {
            submitPerson(newPerson);
        };

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

    // Gets person data for a person if we're editing
    function getPersonData(id) {
        $.get("/api/people/" + id, function(data) {
        if (data) {
            // If this person exists, prefill our form with its data
            $("#firstName").val(data.firstName);
            $("#lastName").val(data.lastName);
            $("#nickname").val(data.nickname);
            $("#job").val(data.role);
            $("#notes").val(data.notes);
            // If we have a person with this id, set a flag for us to know to update the person
            // when we hit submit
            updating = true;
        }
        });
    }

    function updatePerson(person) {
        $.ajax({
            method: "PUT",
            url: "/api/people/" + personId,
            data: person
          })
            .then(function() {
                $("#showAdded").text("'" + person.firstName + "' has successfully been edited.");
            });
    }

    function submitPerson(person) {
        $.post("/api/people", person, function() {
            $("#showAdded").text("'" + person.firstName + "' has been added to your circle.");
          });
    }
});