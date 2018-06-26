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

    Locations.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Locations.hasMany(models.People, {
          onDelete: "cascade"
        });
      };
    return Location;
};