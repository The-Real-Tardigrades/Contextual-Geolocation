// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
let path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // home page route
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Route to see all saved friends of user
  app.get("/people", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myPeople.html"));
  });

  // Route to see all saved locations and track user position
  app.get("/locations", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myLocations.html"));
  });

  // Route to page to add a location
  app.get("/add/location", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addLocation.html"));
  });

  // Route to page to add a person
  app.get("/add/person", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addPerson.html"));
  });

  // Route to page to edit a person
  app.get("/edit/person", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/editPerson.html"));
  });

  // Route to the About Us page
  app.get("/aboutUs", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/aboutUs.html"));
  });
};
