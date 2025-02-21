const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const Column = require("../column/Column");

const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    columnId: {
      type: DataTypes.UUID,
      allowNull : false,
      primaryKey: true,
      references: {
        model: Column,
        key: "columnId",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
      allowNull: false,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "Task",
    timestamps: true,
  }
);

module.exports = Task;
