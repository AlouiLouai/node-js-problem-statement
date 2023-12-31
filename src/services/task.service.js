const { Task } = require('../models')
/**
 * in-memory storage , since we don't need database to store the tasks
 */
const tasks = []
/**
 * this is responsible for auto-increment for in-memroy storing
 */
let nextTaskId = 1;

/**
 * Retrieve a paginated list of tasks.
 * 
 * @param {number} page - The page number.
 * @param {number} pageSize - The number of items to display per page.
 * @returns {object} - An object with the paginated tasks and total count.
 */
async function getAllTask(page = 1, pageSize = 10) {
    // check for pagination positive inputs
    if (typeof page !== 'number' || page < 1) {
        throw new Error('Invalid page value');
    }
    if (typeof pageSize !== 'number' || pageSize < 1) {
        throw new Error('Invalid pageSize value');
    }
    // calculate pagination indices
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedTask = tasks.slice(startIndex, endIndex);

    return {
        tasks: paginatedTask,
        totalTasks: tasks.length
    };
}

/**
 * Get a task by its ID.
 *
 * @param {number} id - The ID of the task to retrieve.
 * @returns {Task} - The task with the specified ID.
 */
async function getTaskById(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        throw new Error('Task not found!');
    }
    return task;
}

/**
 * Create a new task.
 *
 * @param {string} title - The title of the task to create.
 * @param {string} description - The description of the task to create.
 * @returns {Task} - The created task.
 */
async function createTask(title, description) {
    // Check for empty inputs
    // I do not check for the boolean flag, because logically each new task created should be passed as not completed
    if (!title) {
        throw new Error('title should not be empty!');
    }
    if (!description) {
        throw new Error('description should not be empty')
    }
    // Create the task
    const newTask = new Task(
        nextTaskId,
        title,
        description,
        false
    )
    tasks.push(newTask);
    nextTaskId++;
    return newTask
}

/**
 * Update an existing task.
 *
 * @param {number} id - The ID of the task to be updated.
 * @param {string} title - The new title of the task.
 * @param {string} description - The new description of the task.
 * @param {boolean} completed - The completion status of the task.
 * @returns {Task} - The updated task.
 */
async function updateTask(id, title, description, completed) {
    // Find the task index to be updated
    const taskIndex = tasks.findIndex(task => task.id === id);
    // Check for empty inputs
    if (!title) {
        throw new Error('Task title should not be empty');
    }
    if (!description) {
        throw new Error('Task description should not be empty');
    }
    if (taskIndex === -1) {
        throw new Error('Task not found');
    }
    // Update the task
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title,
        description: description,
        completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    };

    return tasks[taskIndex];
}

/**
 * Delete a task by its ID.
 *
 * @param {number} id - The ID of the task to be deleted.
 * @returns {boolean} - `true` if the task is deleted.
 */
async function deleteTask(id) {
    const task = getTaskById(id);
    if (task) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        return true;
    } else {
        throw new Error('Task not found');
    }
}

module.exports = {
    getAllTask, getTaskById, createTask, updateTask, deleteTask
}

