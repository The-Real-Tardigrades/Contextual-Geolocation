module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      locationName: {
        type: DataTypes.STRING(100),
        allowNull: true,
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

    Location.associate = function(models) {
        // Associating Locatons with People
        // When a Location is deleted, also delete any associated Peop
        Location.hasMany(models.Person, {
          onDelete: "cascade"
        });
      };
    return Location;
};