// var Nightmare = require("nightmare");

// // STORY: As a developer nerd, I want to be able to take courses on web tech.
// new Nightmare({ show: true })
//   // Visit start page page
//   .goto("http://circle-of-friends.herokuapp.com")
//   .wait(1000)
// // run a test on the landing page start button
// .click(body > div.intro > a)
// .wait(1000)
// // check the mylocations in the nav bar
// // .click(#mobile-demo > li:nth-child(2) > a)
// .wait(1000)
// // check the edit locations in th nav bar
// // .click(body > nav > div > ul > li:nth-child(1) > a)
// .wait(1000)
// //   add a new location
// .type(#instructions > div > div > div.input-field > label, "random location")
// .wait(500)
// .click(#gmimap0 > area)
// .wait(500)
// .click(#submit)
// .wait(1000)
// .click(#modal1 > div.modal-footer > a:nth-child(1))
// .wait(1000)
// .screenshot("mylocations.png")
// // check on people navigation
// .click(#mobile-demo > li:nth-child(4) > a)
// .wait(1000)
// .screenshot("myPeople.png")
// .click(#mobile-demo > li:nth-child(5) > a)
// .wait(1000)
// .type(body > div.container > form > div:nth-child(1) > label, "John")
// .type(body > div.container > form > div:nth-child(2) > label, "Smith")
// .type(<label for="nickname" class="">Nickname</label>, "Hotdog")
// .type(body > div.container > form > div:nth-child(4) > label, "Manager")
// .type(#notes, "You could even ad a shopping list here")
// .wait (1000)
// .click(#submitButton)
// .click(#mobile-demo > li:nth-child(4) > a)
// .screenshot("myPeople2.png")
// ,wait (3000)
//   // End test
//   .end()
//   // Execute commands
//   .then(function() {
//     console.log("Done!");
//   })
//   // Catch errors
//   .catch(function(err) {
//     console.log(err);
//   });
