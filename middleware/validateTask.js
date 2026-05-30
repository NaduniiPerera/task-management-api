function validateTask(req, res, next) {
  const { title, description, status, priority } = req.body;

  const allowedStatuses = ["todo", "in-progress", "done"];
  const allowedPriorities = ["low", "medium", "high"];

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({
      message: "Description is required",
    });
  }

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be one of: todo, in-progress, done",
    });
  }

  if (!priority || !allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be one of: low, medium, high",
    });
  }

  next();
}

module.exports = validateTask;