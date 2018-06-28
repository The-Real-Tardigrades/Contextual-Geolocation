// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the people
  app.get("/api/people", function(req, res) {
    var query = {};
    if (req.query.Location_id) {
      query.LocationId = req.query.location_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Location
    db.People.findAll({
      where: query,
      include: [db.Locations]
    }).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  // Get route for retrieving a single person
  app.get("/api/people/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Location
    db.People.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Location]
    }).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  app.post("/api/people", function(req, res) {
    db.People.create(req.body).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  // DELETE route for deleting people
  app.delete("/api/people/:id", function(req, res) {
    db.People.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  // PUT route for updating people
  app.put("/api/people", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });
};
