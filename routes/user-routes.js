var db = require("../models");

module.exports = function(app) {
    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Locations, db.People]
        }).then(function(dbUser){
            res.json(dbUser);
        });
    });

    app.get("/api/users/login/:username", function(req, res) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.delete("/api/users/:username", function(req, res) {
        db.User.destroy({
          where: {
            id: req.params.username
          }
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      });
}