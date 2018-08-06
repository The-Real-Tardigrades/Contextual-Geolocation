var db = require("../models");

module.exports = function(app) {
  app.get("/api/locations", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.People
    db.Locations.findAll({
      include: [db.People]
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.get("/api/locations/:id", function(req, res) {
    db.Locations.findOne({
      where: {
        id: req.params.id
      },
      include: [db.People]
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.post("/api/locations", function(req, res) {
    db.Locations.create(req.body).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.delete("/api/locations/:id", function(req, res) {
    db.Locations.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

};
