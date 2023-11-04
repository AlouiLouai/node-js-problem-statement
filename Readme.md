# Task Management API

A simple RESTful API for managing tasks using Node.js and Express.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)

## Introduction

This project is a RESTful API for managing tasks. It provides basic CRUD operations for tasks, including creating, reading, updating, and deleting tasks.

## Features

- Create a new task
- Retrieve a list of tasks with pagination
- Retrieve a single task by ID
- Update an existing task
- Delete a task by ID

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-api.git

2. cd to the folder you cloned already 
3. npm install
4. npm test
5. npm start

### Usage 

To use the API, you can make HTTP requests to the following endpoints:

- GET /tasks: Retrieve a list of all tasks.
- GET /tasks?page=(number)&pageSize(number) Retrieve a list of all tasks paginated.
- GET /tasks/:id: Retrieve a single task by its ID.
- POST /tasks: Create a new task.
- PUT /tasks/:id: Update an existing task by its ID.
- DELETE /tasks/:id: Delete a task by its ID.

For example, to create a new task, you can send a POST request to http://localhost:3000/tasks with a JSON body containing the task details.

#### API Documentation

https://api.postman.com/collections/25832877-96163c38-7c74-4682-bb5c-49ab43e68bb4?access_key=PMAT-01HEDGWH4W1RS07VTZW2CDVYW3

#### Testing

npm test
