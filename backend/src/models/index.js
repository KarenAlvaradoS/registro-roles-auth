const sequelize = require("../config/database");
const User = require("./user.model");
const Role = require("./role.model");

// Relaciones
Role.hasMany(User, { foreignKey: { allowNull: false } });
User.belongsTo(Role);

module.exports = { sequelize, User, Role };
