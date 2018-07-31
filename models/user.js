module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [6]
        }
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [6]
        }
      }
    });
    User.associate = function(models) {
        User.hasMany(models.Locations, {
          onDelete: "cascade"
        });
      };
    
      return User;
  };