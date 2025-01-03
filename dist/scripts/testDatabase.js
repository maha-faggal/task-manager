"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = require("../infrastructure/database/DatabaseConnection");
const User_1 = require("../core/entities/User");
async function testDatabase() {
    try {
        await DatabaseConnection_1.DatabaseConnection.initialize();
        const dbConnection = await DatabaseConnection_1.DatabaseConnection.getInstance();
        const entityManager = dbConnection.getEntityManager();
        const user1 = new User_1.User("1", "user@email.email.com", "123456AbAb", "John Doe");
        const user2 = new User_1.User("2", "user@email.email.com", "123456AbAb", "Jane Doe");
        await entityManager.persist([user1, user2]).flush();
        console.log("✅ Users saved successfully", JSON.stringify([user1, user2]));
    }
    catch (error) {
        console.error("❌ Error", error);
        process.exit(1);
    }
}
testDatabase();
//# sourceMappingURL=testDatabase.js.map