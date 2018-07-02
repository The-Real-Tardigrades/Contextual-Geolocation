let db = require("../models");

module.exports = function(app) {
  app.get("/api/locations", function(req, res) {
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
