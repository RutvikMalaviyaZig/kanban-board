const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const Task = require("../task/Task");


const Column = sequelize.define(
  "Column",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.UUID,
      references: {
        model: 'Board',
        key: "id",
      },
    },
  },
  {
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
