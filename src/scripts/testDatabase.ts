import {DatabaseConnection} from "../infrastructure/database/DatabaseConnection";
import {User} from "../core/entities/User";


async function testDatabase() {
    try {
        await DatabaseConnection.initialize();
        const dbConnection = await DatabaseConnection.getInstance();
        const entityManager = dbConnection.getEntityManager();
        const user1 = new User("1", "user@email.email.com", "123456AbAb", "John Doe");
        const user2 = new User("2", "user@email.email.com", "123456AbAb", "Jane Doe");
        await entityManager.persist([user1, user2]).flush();
        console.log("✅ Users saved successfully", JSON.stringify([user1, user2]));
    } catch (error) {
        console.error("❌ Error", error);
        process.exit(1)
    }
}

testDatabase();
