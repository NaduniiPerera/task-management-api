# Task Management API

This is a RESTful Task Management API built using Node.js and Express.js for the Bloomtech Junior Web Developer Intern Technical Assessment.

## Features

- Express.js server
- Proper project structure with routes, controllers, models, and middleware
- Full CRUD operations for tasks
- In-memory data store
- Input validation with meaningful error messages
- Filtering by status and priority
- Basic pagination
- Categories resource
- Get tasks by category
- Request logging middleware

## Technologies Used

- Node.js
- Express.js
- Git
- GitHub
- Postman for API testing

## Project Structure

```text
task-management-api/
├── controllers/
│   ├── taskController.js
│   └── categoryController.js
├── middleware/
│   ├── logger.js
│   └── validateTask.js
├── models/
│   ├── taskModel.js
│   └── categoryModel.js
├── routes/
│   ├── taskRoutes.js
│   └── categoryRoutes.js
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/task-management-api
```

Go into the project folder:

```bash
cd task-management-api
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:3000
```

## API Endpoints

### Home Route

```http
GET /
```

Example:

```bash
curl http://localhost:3000/
```

### Get All Tasks

```http
GET /tasks
```

Example:

```bash
curl http://localhost:3000/tasks
```

### Create Task

```http
POST /tasks
```

Example body:

```json
{
  "title": "Learn Express",
  "description": "Build REST API using Express",
  "status": "todo",
  "priority": "high",
  "categoryId": 1
}
```

Example curl:

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Learn Express\",\"description\":\"Build REST API using Express\",\"status\":\"todo\",\"priority\":\"high\",\"categoryId\":1}"
```

### Get Task By ID

```http
GET /tasks/:id
```

Example:

```bash
curl http://localhost:3000/tasks/1
```

### Update Task

```http
PUT /tasks/:id
```

Example body:

```json
{
  "title": "Updated Task",
  "description": "Updated task description",
  "status": "in-progress",
  "priority": "medium",
  "categoryId": 1
}
```

Example curl:

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d "{\"title\":\"Updated Task\",\"description\":\"Updated task description\",\"status\":\"in-progress\",\"priority\":\"medium\",\"categoryId\":1}"
```

### Delete Task

```http
DELETE /tasks/:id
```

Example:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### Filter Tasks

```http
GET /tasks?status=todo&priority=high
```

Example:

```bash
curl "http://localhost:3000/tasks?status=todo&priority=high"
```

### Pagination

```http
GET /tasks?page=1&limit=10
```

Example:

```bash
curl "http://localhost:3000/tasks?page=1&limit=10"
```

### Get All Categories

```http
GET /categories
```

Example:

```bash
curl http://localhost:3000/categories
```

### Create Category

```http
POST /categories
```

Example body:

```json
{
  "name": "Personal"
}
```

Example curl:

```bash
curl -X POST http://localhost:3000/categories \
-H "Content-Type: application/json" \
-d "{\"name\":\"Personal\"}"
```

### Get Category By ID

```http
GET /categories/:id
```

Example:

```bash
curl http://localhost:3000/categories/1
```

### Get Tasks By Category

```http
GET /categories/:id/tasks
```

Example:

```bash
curl http://localhost:3000/categories/1/tasks
```

## Validation Rules

Task fields are validated before creating or updating a task.

Required fields:

- title
- description
- status
- priority

Allowed status values:

```text
todo
in-progress
done
```

Allowed priority values:

```text
low
medium
high
```

If invalid data is sent, the API returns a `400 Bad Request` response.

If a task or category is not found, the API returns a `404 Not Found` response.

## Notes

This project uses an in-memory data store. Therefore, data will reset when the server restarts.

## Author

Naduni Perera