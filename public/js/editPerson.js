$(document).ready(function () {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        hover: true
    });
    var url = window.location.search;
    var personId;

    if (url.indexOf("?person_id=") !== -1) {
        personId = url.split("=")[1];
        getPersonData(personId);
    }

    $("#submit").on("click", function () {

        event.preventDefault();

        // Create a new person object to update to the user's database of people
        const editedPerson = {
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            nickname: $("#nickname").val().trim(),
            role: $("#role").val().trim(),
            notes: $("#notes").val(),
            UserId: localStorage.getItem("userId")
        }

        editedPerson.id = personId;
        updatePerson(editedPerson);

        // Clear the form after a person is edited.
        $("#firstName").val("");
        $("#lastName").val("");
        $("#nickname").val("");
        $("#role").val("");
        $("#notes").val("");
        $('.modal').modal();
    });

    $("#delete").on("click", function () {
        event.preventDefault();
        const personToDelete = {
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            nickname: $("#nickname").val().trim(),
            role: $("#role").val().trim(),
            notes: $("#notes").val(),
            UserId: localStorage.getItem("userId")
        }
        personToDelete.id = personId;
        deletePerson(personToDelete);

         // Clear the form after a person is edited.
         $("#firstName").val("");
         $("#lastName").val("");
         $("#nickname").val("");
         $("#role").val("");
         $("#notes").val("");
         $('.modal').modal();
    });

    // Gets person data for the one we are editing
    function getPersonData(id) {
        $.get("/api/people/" + id, function(data) {
        if (data) {
            // If this person exists, prefill our form with its data
            $("#firstName").val(data.firstName);
            $("#lastName").val(data.lastName);
            $("#nickname").val(data.nickname);
            $("#role").val(data.role);
            $("#notes").val(data.notes);
            let locationOption = $("<option selected>");
            locationOption.text(data.Location.locationName);
            locationOption.attr("value", data.Location.locationName);
            
            $("#location").empty();
            $("#location").append(locationOption);
            $('select').formSelect();
        }
        });
    }

    // Function to update person in database
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

    // Function to delete person in database
    function deletePerson(person) {
        $.ajax({
            method: "DELETE",
            url: "/api/people/" + personId,
            data: person
        })
            .then(function() {
                $("#showAdded").text("'" + person.firstName + "' has successfully been deleted.");
            });
    }
});
