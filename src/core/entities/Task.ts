import {ITask, TaskStatus} from "../interfaces/ITask";
import {IUser} from "../interfaces/IUser";


export class Task implements ITask {
    private readonly _id: string;
    private _title: string;
    private _description: string;
    private _status: TaskStatus;
    private readonly _createdBy: IUser;
    private _assignedTo?: IUser;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        createdBy: IUser
    ) {
        if (!id.trim()) {
            throw new Error('Task ID cannot be empty');
        }
        if (!title.trim()) {
            throw new Error('Task title cannot be empty');
        }

        const now = new Date();

        this._id = id;
        this._title = title.trim();
        this._description = description.trim();
        this._status = TaskStatus.TODO;  // New tasks always start as TODO
        this._createdBy = createdBy;
        this._createdAt = now;
        this._updatedAt = now;
    }

    // Public getters to satisfy the interface
    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get status(): TaskStatus {
        return this._status;
    }

    get createdBy(): IUser {
        return this._createdBy;
    }

    get assignedTo(): IUser | undefined {
        return this._assignedTo;
    }

    get createdAt(): Date {
        return new Date(this._createdAt.getTime());
    }

    get updatedAt(): Date {
        return new Date(this._updatedAt.getTime());
    }

    // Methods to modify the task
    updateTitle(newTitle: string): void {
        if (!newTitle.trim()) {
            throw new Error('Task title cannot be empty');
        }
        this._title = newTitle.trim();
        this._updatedAt = new Date();
    }

    updateDescription(newDescription: string): void {
        this._description = newDescription.trim();
        this._updatedAt = new Date();
    }

    updateStatus(newStatus: TaskStatus): void {
        this._status = newStatus;
        this._updatedAt = new Date();
    }

    assignTo(user: IUser): void {
        this._assignedTo = user;
        this._updatedAt = new Date();
    }

    unassign(): void {
        this._assignedTo = undefined;
        this._updatedAt = new Date();
    }
}
