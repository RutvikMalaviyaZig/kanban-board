const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const User = require("../user/Users");
const Column = require("../column/Column");
const { v4: uuidv4 } = require("uuid");


const Board = sequelize.define(
  "Board",
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
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: "userId",
      },
    },
    boardId: {
      type: DataTypes.UUID,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "Board",
    timestamps: true,
    hooks: {
      beforeCreate: (board) => {
        board.boardId = board.id;
      },
    },
  }
);

// Board has many Columns
Board.hasMany(Column, {
  foreignKey: "boardId",
  onDelete: "CASCADE",
});

Column.belongsTo(Board,{
  foreignKey: "boardId"
})

module.exports = Board;
