module.exports = function(sequelize, DataTypes) {
    var Locations = sequelize.define("Locations", {
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
      Locations.hasMany(models.People, {
        onDelete: "cascade"
      });
      Locations.belongsTo(models.User, {
        foreignKey: {
          allowNull: true
        }
      });
    };
    return Locations;
};