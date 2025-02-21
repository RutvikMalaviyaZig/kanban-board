const Column = require("../../models/column/Column");
const Board = require("../../models/board/Board")

const HTTP_STATUS_CODE = require("../../utils/HttpStatusCodes");
const MESSAGES = require("../../utils/Messages");


// Create a new column in a board with the given boardId
const createColumn = async (req, res) => {
  try {
    const { title, boardId } = req.body;

  // Check if all fields are provided
    if (!title || !boardId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: MESSAGES.ALL_FIELDS_REQUIRED,
      });
    }
    
    // Check if the board exists
    const board = await Board.findByPk(boardId);
    if (!board)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.BOARD_NOT_FOUND });
     
    // Create a new column in the board with the given title and boardId
    const column = await Column.create({ title, boardId });

    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: MESSAGES.CREATED,
      data: column,
    });

  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};


// Get all columns in a board with the given boardId
const getColumns = async (req, res) => {
  try {
    // Check if the board exists
    const board = await Board.findByPk(req.params.boardId);
    if (!board)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.BOARD_NOT_FOUND });
    
    // Get all columns in the board with the given boardId
    const columns = await Column.findAll({
      where: { boardId: req.params.boardId },
    });
    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.OK,
      data: columns,
    });

  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};




// Update the column with the given columnId
const updateColumn = async (req, res) => {
  try {
    // Check if the column exists
    const column = await Column.findByPk(req.params.columnId);
    if (!column)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.COLUMN_NOT_FOUND });

    // Update the column with the given columnId with the new title
    const { title } = req.body;
    column.title = title || column.title;

    // Save the updated column
    await column.save();

    res.status(200).json(column);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};



// Delete the column with the given columnId 
const deleteColumn = async (req, res) => {
  try {
    // Check if the column exists
    const column = await Column.findByPk(req.params.columnId);
    if (!column)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.COLUMN_NOT_FOUND });
    
    // Delete the column with the given columnId 
    await column.destroy();
    res.status(HTTP_STATUS_CODE.OK).json({ message: MESSAGES.COLUMN_DELETED });
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createColumn,
  getColumns,
  updateColumn,
  deleteColumn,
};
