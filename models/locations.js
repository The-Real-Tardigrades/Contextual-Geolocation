module.exports = function(sequelize, DataTypes) {
    var Locations = sequelize.define("Locations", {
      locationName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      latitude: {
        type: DataTypes.DECIMAL(18,14),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(18,14),
        allowNull: false
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    });

    Locations.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Locations.hasMany(models.People, {
          onDelete: "cascade"
        });
      };
    return Locations;
};