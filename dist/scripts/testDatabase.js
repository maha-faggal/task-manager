"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = require("../infrastructure/database/DatabaseConnection");
const User_1 = require("../core/entities/User");
let dbConnection;
let entityManager;
async function initializeDatabase() {
    await DatabaseConnection_1.DatabaseConnection.initialize();
    dbConnection = await DatabaseConnection_1.DatabaseConnection.getInstance();
    entityManager = dbConnection.getEntityManager();
}
async function testCreateUser() {
    const user1 = new User_1.User("user1@email.email.com", "123456AbAb", "John Doe");
    const user2 = new User_1.User("user2@email.email.com", "123456AbAb", "Jane Doe");
    await entityManager.persist([user1, user2]).flush();
    console.log("✅ Users created successfully", JSON.stringify([user1, user2]));
}
async function retrieveUsers() {
    const users = await entityManager.find(User_1.User, {});
    for (const user of users) {
        console.log("👤 User:", JSON.stringify({ id: user.id, email: user.email, name: user.name }));
    }
}
async function testUpdateUser(userId, newName) {
    const user = await entityManager.findOne(User_1.User, { id: userId });
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }
    user.name = newName;
    await entityManager.persistAndFlush(user);
    console.log("✅ User updated successfully", JSON.stringify({ id: user.id, email: user.email, name: user.name }));
}
async function testDatabase() {
    try {
        await initializeDatabase();
        //await testCreateUser();
        // await retrieveUsers();
        await testUpdateUser("76270730-4e8c-4c8c-bb2f-9dabf05bdafd", "Alex Springer");
    }
    catch (error) {
        console.error("❌ Error", error);
        process.exit(1);
    }
}
testDatabase();
//# sourceMappingURL=testDatabase.js.map