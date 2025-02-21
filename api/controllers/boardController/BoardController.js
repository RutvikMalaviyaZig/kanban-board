const Board = require("../../models/board/Board");

const HTTP_STATUS_CODE = require("../../utils/HttpStatusCodes");
const MESSAGES = require("../../utils/Messages");


// Create a new board for the user with the given title
const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title || !userId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: MESSAGES.ALL_FIELDS_REQUIRED,
      });
    }

    // Create a new board in the database with the given title and userId
    const board = await Board.create({ title, userId });
  
    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: MESSAGES.CREATED,
      data: board,
    });
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};


// Get all boards of the user with the given userId
const getBoards = async (req, res) => {
  try {
    // Get the userId from the token
    const userId = req.user.id;
   
    if (!userId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: MESSAGES.ALL_FIELDS_REQUIRED,
      });
    }

    // Get all boards of the user with the given userId
    const boards = await Board.findAll({ where: { userId } });
    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.OK,
      data: boards,
    });
    
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};


// Delete the board with the given boardId
const deleteBoard = async (req, res) => {
  try {

    // Check if the board exists
    const board = await Board.findByPk(req.params.boardId);
    if (!board)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.BOARD_NOT_FOUND });
    
    // Check if the user is the owner of the board
    if (board.userId !== req.user.id)
      return res
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json({ message: MESSAGES.UNAUTHORIZED });

    // Delete the board from the database
    await board.destroy();
    
    res.status(HTTP_STATUS_CODE.OK).json({ message: MESSAGES.BOARD_DELETED });

  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createBoard,
  getBoards,
  deleteBoard,
};
