const taskModel = require("../models/taskModel");
const categoryModel = require("../models/categoryModel");

function getTasks(req, res) {
  let tasks = taskModel.getAllTasks();

  const { status, priority, page, limit } = req.query;

  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  if (priority) {
    tasks = tasks.filter((task) => task.priority === priority);
  }

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || tasks.length;

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginatedTasks = tasks.slice(startIndex, endIndex);

  res.status(200).json({
    totalTasks: tasks.length,
    currentPage: pageNumber,
    limit: limitNumber,
    tasks: paginatedTasks,
  });
}

function getTaskById(req, res) {
  const id = parseInt(req.params.id);
  const task = taskModel.getTaskById(id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
}

function createTask(req, res) {
  const { categoryId } = req.body;

  if (categoryId) {
    const category = categoryModel.getCategoryById(parseInt(categoryId));

    if (!category) {
      return res.status(400).json({
        message: "Invalid categoryId. Category does not exist",
      });
    }
  }

  const newTask = taskModel.createTask({
    ...req.body,
    categoryId: categoryId ? parseInt(categoryId) : null,
  });

  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
}

function updateTask(req, res) {
  const id = parseInt(req.params.id);
  const { categoryId } = req.body;

  if (categoryId) {
    const category = categoryModel.getCategoryById(parseInt(categoryId));

    if (!category) {
      return res.status(400).json({
        message: "Invalid categoryId. Category does not exist",
      });
    }
  }

  const updatedTask = taskModel.updateTask(id, {
    ...req.body,
    categoryId: categoryId ? parseInt(categoryId) : null,
  });

  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task updated successfully",
    task: updatedTask,
  });
}

function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  const deletedTask = taskModel.deleteTask(id);

  if (!deletedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask,
  });
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};