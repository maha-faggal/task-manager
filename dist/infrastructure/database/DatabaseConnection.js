"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const User_1 = require("../../core/entities/User");
const Task_1 = require("../../core/entities/Task");
class DatabaseConnection {
    constructor() {
    }
    static async initialize() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            await DatabaseConnection.instance.connect();
            console.log('✅ Database initialized successfully');
        }
    }
    static async getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            await DatabaseConnection.instance.connect();
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        this.orm = await core_1.MikroORM.init({
            entities: [User_1.User, Task_1.Task],
            dbName: 'taskmanager',
            host: 'localhost',
            driver: postgresql_1.PostgreSqlDriver,
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            debug: true,
        });
    }
    getORM() {
        return this.orm;
    }
    getEntityManager() {
        return this.orm.em.fork();
    }
    async closeConnection() {
        await this.orm.close();
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=DatabaseConnection.js.map