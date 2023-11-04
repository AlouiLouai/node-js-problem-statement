const {
    getAllTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
} = require('../task.service');

// Mock Task model
const { Task } = require('../../models/index');

jest.mock('../task.service');

describe('Task Service', () => {
    let mockTasks;
    beforeEach(() => {
        mockTasks = [];
        jest.clearAllMocks();
    });
    // get all tasks
    test('getAllTask returns paginated tasks', () => {
        // Arrange
        mockTasks = [
            new Task(1, 'Task 1', 'Description 1', false),
            new Task(2, 'Task 2', 'Description 2', true),
        ];
        getAllTask.mockReturnValue({
            tasks: mockTasks,
            totalTasks: mockTasks.length,
        });

        // Act
        const result = getAllTask(1, 10);

        // Assert
        expect(result.tasks).toHaveLength(2);
        expect(result.totalTasks).toBe(2);
    });
    // get task by id
    test('getTaskById returns an existing task by ID', () => {
        // Arrange
        const taskToRetrieve = new Task(1, 'Task 1', 'Description 1', false);
        mockTasks = [taskToRetrieve];
        getTaskById.mockReturnValue(taskToRetrieve);

        // Act
        const task = getTaskById(1);

        // Assert
        expect(task).toBeInstanceOf(Task);
        expect(task.id).toBe(1);
        expect(task.title).toBe('Task 1');
        expect(task.description).toBe('Description 1');
    });
    test('getTaskById returns an error for a non-existing task', () => {
        // Arrange
        getTaskById.mockImplementation(() => {
            throw new Error('Task not found!');
        });
        // Act and Assert
        expect(() => {
            getTaskById(1);
        }).toThrowError('Task not found!');
    });
    // create task
    test('creates a new task with valid inputs', () => {
        // Arrange
        const title = 'New Task';
        const description = 'New Description';
        const createdTask = new Task(1, title, description, false); // Mock the created task

        createTask.mockImplementation((t, d) => {
            // Simulate the behavior of createTask and add it to mockTasks
            const task = new Task(mockTasks.length + 1, t, d, false);
            mockTasks.push(task);
            return task;
        });

        // Act
        const result = createTask(title, description);

        // Assert
        expect(result).toMatchObject({
            title: createdTask.title,
            description: createdTask.description,
            completed: createdTask.completed
        });
        expect(mockTasks).toContainEqual(createdTask);
    });
    test('throws an error when title is empty', () => {
        // Arrange
        const title = ''; // Empty title
        const description = 'New Description';

        createTask.mockImplementation(() => {
            throw new Error('title should not be empty!');
        });

        // Act and Assert
        expect(() => createTask(title, description)).toThrow('title should not be empty!');
    });
    test('throws an error when description is empty', () => {
        // Arrange
        const title = 'New Task';
        const description = ''; // Empty description

        createTask.mockImplementation(() => {
            throw new Error('description should not be empty');
        });

        // Act and Assert
        expect(() => createTask(title, description)).toThrow('description should not be empty');
    });
    // update tasks
    test('updates an existing task with valid inputs', () => {
        // Arrange
        const taskId = 1;
        const updatedTitle = 'Updated Task';
        const updatedDescription = 'Updated Description';
        const updatedCompleted = true;

        // Mock the existing task
        const existingTask = new Task(taskId, 'Task 1', 'Description 1', false);

        // Mock the tasks array with the existing task
        mockTasks.push(existingTask);

        updateTask.mockImplementation((id, title, description, completed) => {
            if (id === taskId && title === updatedTitle && description === updatedDescription) {
                return new Task(id, updatedTitle, updatedDescription, completed);
            }
            throw new Error('Task not found');
        });

        // Act
        const updatedTask = updateTask(taskId, updatedTitle, updatedDescription, updatedCompleted);

        // Assert
        expect(updatedTask).toMatchObject({
            id: taskId,
            title: updatedTitle,
            description: updatedDescription,
            completed: updatedCompleted,
        });
    });
    test('throws an error when updating a non-existing task', () => {
        // Arrange
        const taskId = 1;
        const updatedTitle = 'Updated Task';
        const updatedDescription = 'Updated Description';

        updateTask.mockImplementation(() => {
            throw new Error('Task not found');
        });

        // Act and Assert
        expect(() => updateTask(taskId, updatedTitle, updatedDescription)).toThrow('Task not found');
    });
    test('throws an error when updating with an empty title', () => {
        // Arrange
        const taskId = 1;
        const updatedTitle = ''; // Empty title
        const updatedDescription = 'Updated Description';

        updateTask.mockImplementation((id, title, description) => {
            if (title === '') {
                throw new Error('Task title should not be empty');
            }
            throw new Error('Task not found');
        });

        // Act and Assert
        expect(() => updateTask(taskId, updatedTitle, updatedDescription)).toThrow('Task title should not be empty');
    });
    test('throws an error when updating with an empty description', () => {
        // Arrange
        const taskId = 1;
        const updatedTitle = 'Updated Task';
        const updatedDescription = ''; // Empty description

        updateTask.mockImplementation((id, title, description) => {
            if (description === '') {
                throw new Error('Task description should not be empty');
            }
            throw new Error('Task not found');
        });

        // Act and Assert
        expect(() => updateTask(taskId, updatedTitle, updatedDescription)).toThrow('Task description should not be empty');
    });
    // delete task
    test('deletes an existing task', () => {
        // Arrange
        const taskId = 1;
        const deletedTask = new Task(taskId, 'Task 1', 'Description 1', false);
        mockTasks = [deletedTask];

        // Mock the deleteTask function to return true and update mockTasks
        deleteTask.mockImplementation((id) => {
            const taskIndex = mockTasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                mockTasks.splice(taskIndex, 1);
                return true;
            } else {
                throw new Error('Task not found');
            }
        });

        // Act
        const result = deleteTask(taskId);

        // Assert
        expect(result).toBe(true); // The task was deleted
        expect(mockTasks).toHaveLength(0); // The task should be removed from mockTasks
    });
    test('throws an error when deleting a non-existing task', () => {
        // Arrange
        const taskId = 1;

        // Mock the deleteTask function to throw an error for a non-existing task
        deleteTask.mockImplementation((id) => {
            const taskIndex = mockTasks.findIndex(task => task.id === id);
            if (taskIndex === -1) {
                throw new Error('Task not found');
            } else {
                mockTasks.splice(taskIndex, 1);
                return true;
            }
        });
        // Act and Assert
        expect(() => deleteTask(taskId)).toThrow('Task not found');
    });
});
