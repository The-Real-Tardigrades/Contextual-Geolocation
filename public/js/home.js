$(document).ready(function() {
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown( {
      hover: true
  });

  $(".start").on("click", function() {
    $(".login").empty();
    $(".loginForm").removeClass("hidden");
  });
});

