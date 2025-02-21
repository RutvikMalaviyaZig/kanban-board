const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const Board = require("../board/Board");
const Task = require("../task/Task");
const { v4: uuidv4 } = require("uuid");

const Column = sequelize.define(
  "Column",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: uuidv4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Board,
        key: "boardId",
      },
    },
    columnId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "Column",
    timestamps: true,
  }
);

// Column has many Tasks
Column.hasMany(Task, {
  foreignKey: "columnId",
  onDelete: "CASCADE",
});

// Task belongs to Column
Task.belongsTo(Column, {
  foreignKey: "columnId",
});

module.exports = Column;
