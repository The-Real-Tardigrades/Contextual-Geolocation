$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown( {
        hover: true
    });

    $("#register").on("click", function() {
        localStorage.clear();
        const newUser = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        }
        $.post("/api/users", newUser).then(function (data) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("userId", data.id);
            window.location.href="/locations";
        });
    })

    $("#login").on("click", function() {
        $.get("/api/users/login/" + $("#username").val().trim()).then(function (data) {
            if(!data) {
                alert("This user does not exist.");
            }
            else if(data.username === $("#username").val().trim() && data.password !== $("#password").val().trim()) {
                alert("Incorrect Password. Please try again.");
            } 
            else {
                localStorage.setItem("username", data.username);
                localStorage.setItem("userId", data.id);
                window.location.href="/locations";
            }
        })
    })
});
  