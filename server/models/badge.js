const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Post: sequelize.define("badge", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
  }),
};
