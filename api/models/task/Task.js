const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const Column = require("../column/Column");



const Task = sequelize.define(
  "Task",
  {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
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
     
      references: {
        model: 'Column',
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    modelName: "Task",
    timestamps: true,
  }
);

module.exports = Task;
