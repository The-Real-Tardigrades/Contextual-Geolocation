module.exports = function(sequelize, DataTypes) {
    var Person = sequelize.define("Person", {
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

    Person.associate = function(models) {
        // We're saying that a Person should belong to a Location
        // A Person can't be created without a Location due to the foreign key constraint
        Person.belongsTo(models.Location, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Person;
  };