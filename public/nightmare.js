var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
  .goto("https://circle-of-friends.herokuapp.com/")
  .screenshot("login.png")
  .click(".btn-large")
  .screenshot("locations.png")
  .goto("https://circle-of-friends.herokuapp.com/add/location")
  .type("#newLocation", "Long Beach")
  .click("#submit")
  .goto("https://circle-of-friends.herokuapp.com/locations")
  .scrollTo(500, 0)
  .goto("https://circle-of-friends.herokuapp.com/add/person")
  .screenshot("addperson.png")
  .type("#firstName", "Ash")
  .type("#lastName", "Ketchum")
  .type("#nickname", "Pika's Dad")
  .type("#job", "Pokemon Master")
  .type("#notes", "I wanna be the very best. Like no one ever was.")
  .click("#submit")
  .goto("https://circle-of-friends.herokuapp.com/locations")
  .screenshot("locationadded.png")
  .goto("https://circle-of-friends.herokuapp.com/aboutUs")
  .evaluate(function() {
    return document.querySelector('a[href="/"]');
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
