// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // people route loads blog.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/people", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myPeople.html"));
  });

  // locations route loads author-manager.html
  app.get("/locations", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myLocations.html"));
  });

  app.get("/add/location", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addLocation.html"));
  });

  app.get("/add/person", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addPerson.html"));
  });

  app.get("/aboutUs", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/aboutUs.html"));
  });
};
