module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = function(models) {
        User.belongsToMany(models.People, {
            through: models.Locations
        });
    };

    return User;
}