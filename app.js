const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running",
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/categories", categoryRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;