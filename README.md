# TodoList API Documentation

## API Endpoints Description

### 1. Create a new task
- **Endpoint:** `POST /api/tasks`
- **Description:** Creates a new task with a title, description, and status.
- **Response:** Returns the created task.

### 2. Delete a task
- **Endpoint:** `DELETE /api/tasks/{id}`
- **Description:** Deletes a task by its identifier.
- **Response:** Returns the status of the operation.

### 3. Mark a task as done
- **Endpoint:** `PUT /api/tasks/{id}/done`
- **Description:** Changes the status of the task to "done".
- **Response:** Returns the updated task.

### 3.1. Mark a task as pending
- **Endpoint:** `PUT /api/tasks/{id}/pending`
- **Description:** Changes the status of the task to "pending".
- **Response:** Returns the updated task.

### 4. Edit a task
- **Endpoint:** `PUT /api/tasks/{id}`
- **Description:** Updates the title and description of a task.
- **Response:** Returns the updated task.

### 5. Get a list of tasks
- **Endpoint:** `GET /api/tasks`
- **Description:** Retrieves a list of tasks with pagination, filtering by status, and sorting.
- **Response:** Returns the list of tasks and the total count.

### 6. Generate test data
- **Endpoint:** `POST /api/tasks/seed`
- **Description:** Populates the database with initial tasks.
- **Response:** Returns the status of the operation.

## Environment Variables

```env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```
