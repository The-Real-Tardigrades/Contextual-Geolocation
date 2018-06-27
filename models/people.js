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
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        People.belongsTo(models.Locations, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return People;
  };