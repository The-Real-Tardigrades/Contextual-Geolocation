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
  .type("#firstName", "John")
  .type("#lastName", "Smith")
  .type("#nickname", "John Jacob jingleheimerschmidt")
  .type("#job", "Manager")
  .type("#notes", "I wanna be the very best. Like no one ever was. To catch them is my real test. To train them is my cause")
  .click("#submitButton")
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
