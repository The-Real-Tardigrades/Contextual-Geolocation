module.exports = function(sequelize, DataTypes) {
    var People = sequelize.define("People", {
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });

    People.associate = function(models) {
        People.belongsTo(models.Locations, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return People;
  };