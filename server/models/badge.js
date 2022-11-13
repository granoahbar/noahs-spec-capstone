const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Badge: sequelize.define("badge", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    parkCode: DataTypes.STRING,
    parkName: DataTypes.STRING,
    parkImgUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }),
};
