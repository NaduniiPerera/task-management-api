let tasks = [
  {
    id: 1,
    title: "Complete backend lab",
    description: "Build RESTful Task Management API",
    status: "todo",
    priority: "high",
    categoryId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextTaskId = 2;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(taskData) {
  const now = new Date().toISOString();

  const newTask = {
    id: nextTaskId++,
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    priority: taskData.priority,
    categoryId: taskData.categoryId || null,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updatedData) {
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  task.title = updatedData.title;
  task.description = updatedData.description;
  task.status = updatedData.status;
  task.priority = updatedData.priority;
  task.categoryId = updatedData.categoryId || null;
  task.updatedAt = new Date().toISOString();

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  const deletedTask = tasks.splice(index, 1);
  return deletedTask[0];
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};