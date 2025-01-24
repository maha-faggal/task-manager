import {EntityManager} from "@mikro-orm/core";
import {User} from "../core/entities/User";

export class UserService {
    constructor(private readonly entityManager: EntityManager) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.entityManager.find(User, {});
    }
}
