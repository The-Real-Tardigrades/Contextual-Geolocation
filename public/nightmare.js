const Nightmare = require("nightmare");

const nightmare = Nightmare({ show: true });

nightmare
  .goto("http://localhost:8080/")
  .screenshot("login.png")
  .click(".btn-large")
  .screenshot("locations.png")
  .click("#locationContainer")
  .click("#myPeopleDropdown")
  .evaluate(function() {
    return document.querySelector("#links a").href;
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
