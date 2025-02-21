const Column = require("../../models/column/Column");
const Board = require("../../models/board/Board");

const HTTP_STATUS_CODE = require("../../utils/HttpStatusCodes");
const MESSAGES = require("../../utils/Messages");



const createColumn = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: MESSAGES.ALL_FIELDS_REQUIRED,
      });
    }
    
    const column = await Column.create({ title, boardId });
    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: MESSAGES.CREATED,
      data: column,
    });
  } catch (err) {
   console.log(err);
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};



const getColumns = async (req, res) => {
  try {
    const columns = await Column.findAll({
      where: { boardId: req.params.boardId },
    });
    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.OK,
      data: columns,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};




const updateColumn = async (req, res) => {
  try {
    const column = await Column.findByPk(req.params.columnId);
    if (!column)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.COLUMN_NOT_FOUND });

    const { title } = req.body;
    column.title = title || column.title;
    await column.save();

    res.status(200).json(column);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};




const deleteColumn = async (req, res) => {
  try {
    const column = await Column.findByPk(req.params.columnId);
    if (!column)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.COLUMN_NOT_FOUND });
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
