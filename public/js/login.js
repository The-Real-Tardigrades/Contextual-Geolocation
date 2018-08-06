$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown( {
        hover: true
    });

    $("#register").on("click", function() {
        const newUser = {
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        }
        $.post("/api/users", newUser).then(function (data) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("userId", data.id);
        });
    })
});
  