const categoryModel = require("../models/categoryModel");
const taskModel = require("../models/taskModel");

function getCategories(req, res) {
  const categories = categoryModel.getAllCategories();

  res.status(200).json(categories);
}

function getCategoryById(req, res) {
  const id = parseInt(req.params.id);
  const category = categoryModel.getCategoryById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json(category);
}

function createCategory(req, res) {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Category name is required",
    });
  }

  const newCategory = categoryModel.createCategory(name);

  res.status(201).json({
    message: "Category created successfully",
    category: newCategory,
  });
}

function getTasksByCategory(req, res) {
  const id = parseInt(req.params.id);
  const category = categoryModel.getCategoryById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  const tasks = taskModel
    .getAllTasks()
    .filter((task) => task.categoryId === id);

  res.status(200).json({
    category,
    tasks,
  });
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  getTasksByCategory,
};