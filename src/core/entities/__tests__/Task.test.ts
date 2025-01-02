// src/core/entities/__tests__/Task.test.ts
import {IUser} from '../../interfaces/IUser';
import {Task} from '../Task';
import {TaskStatus} from '../../interfaces/ITask';

describe('Task', () => {
    // Create a mock user for our tests
    const mockUser: IUser = {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        createdAt: new Date(),
    };

    it('creates a task with valid data', () => {
        const task = new Task(
            'task123',
            'Test Task',
            'Test Description',
            mockUser
        );

        expect(task.id).toBe('task123');
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Test Description');
        expect(task.status).toBe(TaskStatus.TODO);
        expect(task.createdBy).toBe(mockUser);
        expect(task.assignedTo).toBeUndefined();
        expect(task.createdAt).toBeInstanceOf(Date);
        expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('throws error for empty title', () => {
        expect(() => {
            new Task('task123', '', 'Description', mockUser);
        }).toThrow('Task title cannot be empty');
    });

    it('throws error for empty id', () => {
        expect(() => {
            new Task('', 'Title', 'Description', mockUser);
        }).toThrow('Task ID cannot be empty');
    });

    it('updates task status correctly', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);

        task.updateStatus(TaskStatus.IN_PROGRESS);
        expect(task.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('assigns task to user correctly', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);
        const assignee: IUser = {
            ...mockUser,
            id: 'user456',
            name: 'Assignee User'
        };

        task.assignTo(assignee);
        expect(task.assignedTo).toBe(assignee);
    });

    it('unassigns task correctly', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);
        const assignee: IUser = {
            ...mockUser,
            id: 'user456',
            name: 'Assignee User'
        };

        task.assignTo(assignee);
        task.unassign();
        expect(task.assignedTo).toBeUndefined();
    });

    it('updates title correctly', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);

        task.updateTitle('New Title');
        expect(task.title).toBe('New Title');
    });

    it('throws error when updating to empty title', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);

        expect(() => {
            task.updateTitle('');
        }).toThrow('Task title cannot be empty');
    });

    it('updates description correctly', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);

        task.updateDescription('New Description');
        expect(task.description).toBe('New Description');
    });

    it('updates updatedAt timestamp when making changes', () => {
        const task = new Task('task123', 'Test Task', 'Description', mockUser);
        const originalUpdate = task.updatedAt;

        // Wait a small amount to ensure timestamp will be different
        jest.advanceTimersByTime(1000);

        task.updateTitle('New Title');
        expect(task.updatedAt.getTime()).toBeGreaterThan(originalUpdate.getTime());
    });
});
