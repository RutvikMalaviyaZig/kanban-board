const Task = require("../../models/task/Task");

const HTTP_STATUS_CODE = require("../../utils/HttpStatusCodes");
const MESSAGES = require("../../utils/Messages");

// Create a new task in a column with the given columnId
const createTask = async (req, res) => {
  try {
    // Get the title, description, and columnId from the request body
    const { title, description, columnId } = req.body;

    // Get the last task to determine the order of the new task
    const lastTask = await Task.findOne({
      where: { columnId },
      order: [["order", "DESC"]], // Get the task with the highest order
    });

    // Set the order of the new task If no task, set order as 0
    const newOrder = lastTask ? lastTask.order + 1 : 0;

    // Create the new task in the database with the given title, description, columnId, and order
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

// Get all tasks in a column with the given columnId
const getTasks = async (req, res) => {
  try {
    // Find all tasks in the database with the given columnId
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

// Update a task with the given taskId in the database
const updateTask = async (req, res) => {
  try {
    // Find the task with the given taskId in the database
    const task = await Task.findByPk(req.params.taskId);
    if (!task)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.TASK_NOT_FOUND });

    // Update the task's title and description
    const { title, description } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;

    // Save the updated task in the database
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

// Delete a task with the given taskId from the database
const deleteTask = async (req, res) => {
  try {
    // Find the task with the given taskId in the database
    const task = await Task.findByPk(req.params.taskId);
    if (!task)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.TASK_NOT_FOUND });

    // Delete the task from the database
    await task.destroy();
    res.status(HTTP_STATUS_CODE.OK).json({
      message: MESSAGES.TASK_DELETED,
      deleted: task,
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
    // Get the taskId, columnId, and order from the request body
    const { taskId, columnId, order } = req.body;
    // Check if the task exists
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json({ message: MESSAGES.TASK_NOT_FOUND });

    // Update the task's columnId and order
    task.columnId = columnId;
    task.order = order;

    // Save the updated task in the database
    await task.save();

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
