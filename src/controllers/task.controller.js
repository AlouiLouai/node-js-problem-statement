const taskService = require('../services/task.service');

/**
 * Create a new task.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const newTask = await taskService.createTask(title, description);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get a paginated list of tasks.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getAllTasks(req, res) {
  try {
    const { page, pageSize } = req.query;
    const result = await taskService.getAllTask(parseInt(page), parseInt(pageSize));
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get a task by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getTaskById(req, res) {
  try {
    const task = await taskService.getTaskById(parseInt(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

/**
 * Update an existing task.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function updateTask(req, res) {
  try {
    const { title, description, completed } = req.body;
    const updatedTask = await taskService.updateTask(
      parseInt(req.params.id),
      title,
      description,
      completed
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete a task by its ID.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function deleteTask(req, res) {
  try {
    const taskId = parseInt(req.params.id);
    await taskService.deleteTask(taskId);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
