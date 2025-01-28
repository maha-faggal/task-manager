import {EntityManager} from "@mikro-orm/core";
import {User} from "../core/entities/User";
import {UserValidationError} from "../core/errors/UserValidationError";

export class UserService {
    constructor(private readonly entityManager: EntityManager) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.entityManager.find(User, {});
    }

    async createUser(email: string, password: string, name: string): Promise<User> {
        try {
            const user = new User(email, password, name);
            await this.entityManager.persistAndFlush(user);
            return user;
        } catch (error) {
            if (error instanceof UserValidationError) {
                throw error;
            } else {
                throw new Error('Failed to Create User')
            }
        }
    }
}
