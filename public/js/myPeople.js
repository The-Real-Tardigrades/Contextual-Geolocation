$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown( {
        hover: true
    });


  });

  // Retrieve all the stored information for people from database to display on page
  $.get("/api/people", function(data){
    data.forEach(function(person){
        let newRow = $("<tr>");
        let firstName = $("<td>").text(person.firstName);
        let lastName = $("<td>").text(person.lastName);
        let nickname = $("<td>").text(person.nickname);
        let role = $("<td>").text(person.role);
        let notes = $("<td>").text(person.notes);
        let location = $("<td>").text(person.Location.locationName);
        console.log(location);
        $("#peopleTable > tbody").append(newRow.append(firstName).append(lastName).append(nickname).append(role).append(notes).append(location));
    });
});