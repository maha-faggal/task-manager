"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const User_1 = require("../../core/entities/User");
const Task_1 = require("../../core/entities/Task");
const initializeDatabase = async () => {
    const orm = await core_1.MikroORM.init({
        entities: [User_1.User, Task_1.Task],
        dbName: 'taskmanager',
        host: 'localhost',
        driver: postgresql_1.PostgreSqlDriver,
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        debug: true,
    });
    return orm;
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=database.js.map