import {initializeDatabase} from './infrastructure/database/database';


async function bootstrap() {
    try {
        const orm = await initializeDatabase();
        console.log("Connected to database");
    } catch (err) {
        console.error("Failed to connect to database", err);
        process.exit(1)
    }
}


bootstrap()
