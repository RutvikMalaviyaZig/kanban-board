const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Column = require("../column/Column");



const Board = sequelize.define(
  "Board",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    modelName: "Board",
    timestamps: true,
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
