import express from 'express';
import {DatabaseConnection} from '../infrastructure/database/DatabaseConnection';
import {UserService} from '../services/UserService';

export function createServer() {
    const app = express();

    // Define API routes
    app.get('/users', async (req, res) => {
        try {
            const dbConnection = await DatabaseConnection.getInstance();
            const userService = new UserService(dbConnection.getEntityManager());
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('❌ Error fetching users:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    });

    return app;
}

//
// // Export an async initializer for the database if needed
// export async function initializeDatabase() {
//     try {
//         await DatabaseConnection.initialize();
//         console.log('🟢 Database connection established');
//     } catch (error) {
//         console.error('❌ Failed to initialize Database', error);
//         process.exit(1);
//     }
// }
