const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/:id/tasks", categoryController.getTasksByCategory);

module.exports = router;