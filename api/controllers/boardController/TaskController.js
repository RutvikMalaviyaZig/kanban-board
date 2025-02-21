const Task = require("../../models/task/Task");
const Column = require("../../models/column/Column");
const sequelize = require("sequelize");

const HTTP_STATUS_CODE = require("../../utils/HttpStatusCodes");
const MESSAGES = require("../../utils/Messages");

const createTask = async (req, res) => {

  try {
    const { title, description, columnId } = req.body;

    // Get the last task to determine the order of the new task
    const lastTask = await Task.findOne({
      where: { columnId },
      order: [["order", "DESC"]], // Get the task with the highest order
    });

    const newOrder = lastTask ? lastTask.order + 1 : 0; // If no task, set order as 0

    const task = await Task.create({
      title,
      description,
      columnId,
      order: newOrder,
    });

    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: MESSAGES.CREATED,
      data: task,
    });
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};



const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { columnId: req.params.columnId },
      order: [["order", "ASC"]], // Sort tasks by order (ascending)
    });
    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.OK,
      data: tasks,
    });
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    if (!task)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.TASK_NOT_FOUND });

    const { title, description } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    const newTask = await task.save();

    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.OK,
      data: newTask,
    });
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    if (!task)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.TASK_NOT_FOUND });

    await task.destroy();
    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.TASK_DELETED,
    });
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Drag and Drop Task to Another Column
const moveTask = async (req, res) => {
  try {
    const { taskId, columnId, order } = req.body;

    // Check if the task exists
    const task = await Task.findByPk(taskId);
    if (!task)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.TASK_NOT_FOUND });

    const oldColumnId = task.columnId; // Save the old column ID

    // Update the task's columnId and order
    task.columnId = columnId;
    task.order = order;
    await task.save();

    // Adjust other tasks' order in the target column if needed
    await Task.update(
      { order: sequelize.Sequelize.literal("order + 1") },
      {
        where: {
          columnId,
          order: { [sequelize.Op.gte]: order }, // Reorder tasks after the moved task
        },
      }
    );

    // Match columnid with oldcolumnid
    if (oldColumnId !== columnId) {
      // Remove the task from the old column by updating the order of tasks
      await Task.update(
        { order: sequelize.Sequelize.literal("order - 1") },
        {
          where: {
            columnId: oldColumnId,
            order: { [sequelize.Op.gt]: task.order }, // Update order of tasks after the moved task
          },
        }
      );
    }

    // Return the updated task
    res.status(200).json(task);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
};
