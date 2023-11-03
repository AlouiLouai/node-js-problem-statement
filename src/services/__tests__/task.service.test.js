const {
    getAllTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
} = require('../task.service');

// Mock Task model
const { Task } = require('../../models/index');


describe('Task Service', () => {

    // Mock tasks array for testing
    const mockTasks = [
        new Task(1, 'Task 1', 'Description 1', false),
        new Task(2, 'Task 2', 'Description 2', true),
    ];

    // Mock the in-memory tasks
    jest.mock('../task.service', () => {
        const original = jest.requireActual('../task.service');
        return {
            ...original,
            tasks: mockTasks,
        };
    });

    beforeEach(() => {
        // Reset the tasks array before each test
        mockTasks.length = 0;
    });

    test('getAllTasks returns paginated tasks', () => {
        const result = getAllTask(1, 10);
        expect(result.tasks).toHaveLength(mockTasks.length);
        expect(result.totalTasks).toBe(mockTasks.length);
    });

    test('createTask creates a new task', () => {
        const createdTask = createTask('New Task', 'New Description');
        expect(createdTask).toBeInstanceOf(Task);
        expect(createdTask.title).toBe('New Task');
        expect(createdTask.description).toBe('New Description');
        expect(createdTask.completed).toBe(false);
    });

    test('updateTask updates an existing task', () => {
        mockTasks.push(new Task(3, 'Task 3', 'Description 3', false));
        const updatedTask = updateTask(3, 'Updated Task', 'Updated Description', true);
        expect(updatedTask).toBeInstanceOf(Task);
        expect(updatedTask.title).toBe('Updated Task');
        expect(updatedTask.description).toBe('Updated Description');
        expect(updatedTask.completed).toBe(true);
    });

    test('deleteTask deletes an existing task', () => {
        mockTasks.push(new Task(4, 'Task 4', 'Description 4', false));
        const deleted = deleteTask(4);
        expect(deleted).toBe(true);
    });

    test('deleteTask throws an error for a non-existing task', () => {
        expect(() => {
            deleteTask(5);
        }).toThrow('Task not found!');
    });

    test('getTaskById returns an existing task by ID', () => {
        mockTasks.push(new Task(5, 'Task 5', 'Description 5', false));
        const task = getTaskById(5);
        expect(task).toBeInstanceOf(Task);
        expect(task.id).toBe(5);
        expect(task.title).toBe('Task 5');
        expect(task.description).toBe('Description 5');
    });

    test('getTaskById throws an error for a non-existing task', () => {
        expect(() => {
            getTaskById(6);
        }).toThrow('Task not found!');
    });
});
