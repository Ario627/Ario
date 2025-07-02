# Simple To-Do List API

This is a basic To-Do List API built with Node.js and Express. It allows you to manage a list of tasks.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Installation

1.  **Clone the repository (or download the files):**
    ```bash
    # If this were a git repo, you would clone it.
    # For now, just ensure you have index.js and package.json
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd your-project-directory
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Server

To start the API server, run:

```bash
node index.js
```

By default, the server will start on `http://localhost:3000`.

## API Endpoints

All request and response bodies are in JSON format.

### `POST /tasks`

Create a new task.

**Request Body:**

```json
{
  "title": "Your task description"
}
```

**Response (201 Created):**

```json
{
  "id": 3,
  "title": "Your task description",
  "completed": false
}
```

**Example (using curl):**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"Walk the dog"}' http://localhost:3000/tasks
```

### `GET /tasks`

Retrieve all tasks.

**Response (200 OK):**

```json
[
  { "id": 1, "title": "Buy groceries", "completed": false },
  { "id": 2, "title": "Clean the house", "completed": true }
]
```

**Example (using curl):**

```bash
curl http://localhost:3000/tasks
```

### `GET /tasks/:id`

Retrieve a specific task by its ID.

**Parameters:**

-   `id` (integer, required): The ID of the task to retrieve.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false
}
```

**Response (404 Not Found if task doesn't exist):**

```json
{
  "error": "Task not found"
}
```

**Example (using curl):**

```bash
curl http://localhost:3000/tasks/1
```

### `PUT /tasks/:id`

Update an existing task. You can update the `title` and/or `completed` status.

**Parameters:**

-   `id` (integer, required): The ID of the task to update.

**Request Body (optional fields):**

```json
{
  "title": "Updated task description",
  "completed": true
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Updated task description",
  "completed": true
}
```

**Response (404 Not Found if task doesn't exist):**

```json
{
  "error": "Task not found"
}
```

**Example (using curl to mark task 1 as completed):**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' http://localhost:3000/tasks/1
```

### `DELETE /tasks/:id`

Delete a task by its ID.

**Parameters:**

-   `id` (integer, required): The ID of the task to delete.

**Response (204 No Content):**
(No response body)

**Response (404 Not Found if task doesn't exist):**

```json
{
  "error": "Task not found"
}
```

**Example (using curl):**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Simple In-Memory Storage

**Note:** This API uses a simple in-memory array to store tasks. This means that all tasks will be lost if the server restarts. For a production application, you would use a persistent database (e.g., PostgreSQL, MongoDB).
