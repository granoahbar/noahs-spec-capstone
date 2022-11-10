const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Badge: sequelize.define("badge", {
    badgeId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    parkCode: DataTypes.STRING,
    parkName: DataTypes.STRING,
    parkImgUrl: DataTypes.STRING,
  }),
};
