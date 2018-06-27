// this is our app

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

// people route loads blog.html
app.get("/people", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addPerson.html"));
  });

  app.get("/people", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/myPeople.html"));
  });

  // locations route loads author-manager.html
  app.get("/locations", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/myLocations.html"));
  });

  app.get("/locations", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addLocation.html"));
  });

  app.get("/add/person", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addPerson.html"));
  });

};