import {DatabaseConnection} from "../infrastructure/database/DatabaseConnection";
import {User} from "../core/entities/User";

let dbConnection: DatabaseConnection;
let entityManager: ReturnType<DatabaseConnection['getEntityManager']>;


async function initializeDatabase() {
    await DatabaseConnection.initialize();
    dbConnection = await DatabaseConnection.getInstance();
    entityManager = dbConnection.getEntityManager();
}


async function testCreateUser() {
    const user1 = new User("user1@email.email.com", "123456AbAb", "John Doe");
    const user2 = new User("user2@email.email.com", "123456AbAb", "Jane Doe");
    await entityManager.persist([user1, user2]).flush();
    console.log("✅ Users created successfully", JSON.stringify([user1, user2]));

}

async function retrieveUsers() {
    const users = await entityManager.find(User, {});
    for (const user of users) {
        console.log("👤 User:", JSON.stringify({id: user.id, email: user.email, name: user.name}));
    }
}

async function testUpdateUser(userId: string, newName: string) {
    const user = await entityManager.findOne(User, {id: userId});
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }
    user.name = newName;
    await entityManager.persistAndFlush(user);
    console.log("✅ User updated successfully", JSON.stringify({id: user.id, email: user.email, name: user.name}));

}

async function testDatabase() {
    try {
        await initializeDatabase();
        //await testCreateUser();
        await retrieveUsers();
        await testUpdateUser("e645d4d2-4d1f-4107-a96b-9cbddaf27d3e", "Alex Springer");
    } catch (error) {
        console.error("❌ Error", error);
        process.exit(1)
    }
}

testDatabase();
