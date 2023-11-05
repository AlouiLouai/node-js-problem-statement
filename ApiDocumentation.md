# Tasks

## Get All Tasks
- Endpoint: /tasks
- Method: GET
- Description: Retrieve a paginated list of all tasks.
- Parameters:
  - page (optional): The page number (default is 1).
  - pageSize (optional): The number of tasks per page (default is 10).
- Response:
  - 200 OK: Returns a JSON object with paginated tasks and the total count.
  - 400 Bad Request: If there's an issue with the request.

## Get Task by ID
- Endpoint: /tasks/:id
- Method: GET
- Description: Retrieve a single task by its ID.
- Parameters:
  - id (required): The unique ID of the task.
- Response:
  - 200 OK: Returns a JSON object with the task.
  - 404 Not Found: If the task with the specified ID does not exist.

## Create Task
- Endpoint: /tasks
- Method: POST
- Description: Create a new task.
- Request Body:
  - title (required): The title of the task.
  - description (required): The description of the task.
- Response:
  - 201 Created: Returns the newly created task.
  - 400 Bad Request: If there's an issue with the request.

## Update Task
- Endpoint: /tasks/:id
- Method: PUT
- Description: Update an existing task by its ID.
- Parameters:
  - id (required): The unique ID of the task.
- Request Body:
  - title (required): The new title of the task.
  - description (required): The new description of the task.
  - completed (optional): The completion status of the task.
- Response:
  - 200 OK: Returns the updated task.
  - 400 Bad Request: If there's an issue with the request.
  - 404 Not Found: If the task with the specified ID does not exist.

## Delete Task
- Endpoint: /tasks/:id
- Method: DELETE
- Description: Delete a task by its ID.
- Parameters:
  - id (required): The unique ID of the task.
- Response:
  - 204 No Content: Indicates successful deletion.
  - 404 Not Found: If the task with the specified ID does not exist.
