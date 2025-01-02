// src/core/interfaces/ITask.ts
import {IUser} from './IUser';

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdBy: IUser;
    assignedTo?: IUser;    // Optional - tasks might not be assigned yet
    createdAt: Date;
    updatedAt: Date;
}

// src/core/entities/TaskStatus.ts
export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    IN_REVIEW = 'IN_REVIEW',
    DONE = 'DONE'
}
