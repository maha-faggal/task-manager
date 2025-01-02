"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/database/validateConnection.ts
const core_1 = require("@mikro-orm/core");
const User_1 = require("../../core/entities/User");
const Task_1 = require("../../core/entities/Task");
async function validateConnection() {
    let orm;
    try {
        orm = await core_1.MikroORM.init({
            entities: [User_1.User, Task_1.Task],
            dbName: 'taskmanager',
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            debug: true,
        });
        // Test the connection
        await orm.em.getConnection().execute('SELECT 1');
        console.log('✅ Database connection successful');
        // Check if we can connect to the specific database
        const generator = orm.getSchemaGenerator();
        await generator.getCreateSchemaSQL();
        console.log('✅ Database schema validation successful');
        await orm.close();
        console.log('✅ Connection closed successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}
validateConnection();
//# sourceMappingURL=validateConnection.js.map