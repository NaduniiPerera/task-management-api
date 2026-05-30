const express = require("express");
const taskController = require("../controllers/taskController");
const validateTask = require("../middleware/validateTask");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, taskController.getTasks);
router.post("/", authMiddleware, validateTask, taskController.createTask);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, validateTask, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;