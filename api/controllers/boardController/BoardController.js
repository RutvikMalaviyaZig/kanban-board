const Board = require("../../models/board/Board");

const HTTP_STATUS_CODE = require("../../utils/HttpStatusCodes");
const MESSAGES = require("../../utils/Messages");

const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title || !userId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: MESSAGES.ALL_FIELDS_REQUIRED,
      });
    }

    const board = await Board.create({ title, userId });
  
    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: MESSAGES.CREATED,
      data: board,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getBoards = async (req, res) => {
  try {
    const userId = req.user.id;
   
    if (!userId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: MESSAGES.ALL_FIELDS_REQUIRED,
      });
    }
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

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.boardId);
    if (!board)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.BOARD_NOT_FOUND });
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
