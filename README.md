# Task Management API

This is a RESTful Task Management API built using Node.js and Express.js for the Bloomtech Junior Web Developer Intern Technical Assessment.

The API supports task management, category management, request validation, filtering, pagination, request logging, and JWT-based authentication.

## Features

* Express.js server
* Proper project structure with routes, controllers, models, and middleware
* Full CRUD operations for tasks
* In-memory data store
* Input validation with meaningful error messages
* Filtering by status and priority
* Basic pagination
* Categories resource
* Get tasks by category
* Request logging middleware
* User registration and login with JWT authentication
* Protected task routes using JWT middleware

## Technologies Used

* Node.js
* Express.js
* JavaScript
* Git
* GitHub
* Postman for API testing
* JSON Web Token
* bcryptjs

## Project Structure

```text
task-management-api/
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   └── taskController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── logger.js
│   └── validateTask.js
├── models/
│   ├── categoryModel.js
│   ├── taskModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   └── taskRoutes.js
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
git clone https://github.com/NaduniiPerera/task-management-api
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

## Authentication

This API includes JWT authentication.

Users can register and login using the authentication endpoints. After successful registration or login, the API returns a JWT token.

All task routes are protected. To access task routes, the token must be sent in the request header.

Authorization header format:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

In Postman, the token can be added from:

```text
Authorization → Bearer Token
```

## Important In-Memory Data Store Note

This project uses an in-memory data store instead of a database.

That means users, tasks, and categories are stored only while the server is running. If the server is stopped or restarted, any newly registered users, created tasks, and created categories will be reset.

For example, if a user registers and logs in successfully, those login details are available only during the current server session. After restarting the server, the previous registered user details will no longer exist, so the user must register again before logging in.

This behavior is expected because the assessment says that no database is required. The code is still organized using models, controllers, routes, and middleware so that a real database can be added later with fewer changes.

## API Endpoints

### Home Route

```http
GET /
```

Example:

```bash
curl http://localhost:3000/
```

### Register User

```http
POST /auth/register
```

Example request body:

```json
{
  "name": "Naduni",
  "email": "naduni@example.com",
  "password": "123456"
}
```

Example curl:

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d "{\"name\":\"Naduni\",\"email\":\"naduni@example.com\",\"password\":\"123456\"}"
```

### Login User

```http
POST /auth/login
```

Example request body:

```json
{
  "email": "naduni@example.com",
  "password": "123456"
}
```

Example curl:

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d "{\"email\":\"naduni@example.com\",\"password\":\"123456\"}"
```

### Get All Tasks

This route is protected and requires a JWT token.

```http
GET /tasks
```

Example curl:

```bash
curl http://localhost:3000/tasks \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Task

This route is protected and requires a JWT token.

```http
POST /tasks
```

Example request body:

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
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d "{\"title\":\"Learn Express\",\"description\":\"Build REST API using Express\",\"status\":\"todo\",\"priority\":\"high\",\"categoryId\":1}"
```

### Get Task By ID

This route is protected and requires a JWT token.

```http
GET /tasks/:id
```

Example curl:

```bash
curl http://localhost:3000/tasks/1 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Task

This route is protected and requires a JWT token.

```http
PUT /tasks/:id
```

Example request body:

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
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d "{\"title\":\"Updated Task\",\"description\":\"Updated task description\",\"status\":\"in-progress\",\"priority\":\"medium\",\"categoryId\":1}"
```

### Delete Task

This route is protected and requires a JWT token.

```http
DELETE /tasks/:id
```

Example curl:

```bash
curl -X DELETE http://localhost:3000/tasks/1 \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Filter Tasks

This route is protected and requires a JWT token.

```http
GET /tasks?status=todo&priority=high
```

Example curl:

```bash
curl "http://localhost:3000/tasks?status=todo&priority=high" \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Pagination

This route is protected and requires a JWT token.

```http
GET /tasks?page=1&limit=10
```

Example curl:

```bash
curl "http://localhost:3000/tasks?page=1&limit=10" \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
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

Example request body:

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

## Task Data Format

Each task contains the following fields:

```json
{
  "id": 1,
  "title": "Complete backend lab",
  "description": "Build RESTful Task Management API",
  "status": "todo",
  "priority": "high",
  "categoryId": 1,
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Validation Rules

Task fields are validated before creating or updating a task.

Required task fields:

* title
* description
* status
* priority

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

## Completed Requirements

### Core Requirements Completed

* Set up an Express.js server
* Used a proper project structure with routes, controllers, models, and middleware
* Implemented full CRUD for tasks
* Added required task fields: id, title, description, status, priority, createdAt, and updatedAt
* Added query-string filtering by status and priority
* Implemented input validation with meaningful error messages
* Used proper HTTP status codes such as 400 and 404
* Used an in-memory data store
* Structured the code so a real database can be added later

### Intermediate Challenges Completed

* Added a Categories resource
* Allowed tasks to be assigned to a category
* Added endpoint to get tasks by category
* Implemented basic pagination
* Added request logging middleware
* Wrote setup instructions and example API requests in this README file

### Stretch Goal Completed

* Added user registration with `POST /auth/register`
* Added user login with `POST /auth/login`
* Returned a JWT token after registration and login
* Protected all task routes using JWT authentication middleware

### Stretch Goal Not Completed

* Live deployment was not completed because the deployment platform required card/payment verification.

## Author

Naduni Perera
