var db = require("../models");

module.exports = function(app) {
  app.get("/api/locations", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Location.findAll({
      include: [db.Post]
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.get("/api/locations/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Location.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.post("/api/locations", function(req, res) {
    db.Location.create(req.body).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.delete("/api/locations/:id", function(req, res) {
    db.Location.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

};
