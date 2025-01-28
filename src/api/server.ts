import express from 'express';
import {DatabaseConnection} from '../infrastructure/database/DatabaseConnection';
import {UserService} from '../services/UserService';
import {UserValidationError} from "../core/errors/UserValidationError";

export function createServer() {
    const app = express();
    app.use(express.json());
    app.use((req, res, next) => {
        console.log('Incoming request:');
        console.log('Method:', req.method);
        console.log('Path:', req.path);
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);  // This should show the parsed JSON
        next();
    });
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path} - Body:`, req.body);
        next();
    });
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

    app.post('/users', async (req, res) => {
        try {

            const {email, password, name} = req.body;
            if (!email || !password || !name) {
                res.status(400).json({message: 'Missing required fields'});
                return;
            }
            const dbConnection = await DatabaseConnection.getInstance();
            const userService = new UserService(dbConnection.getEntityManager());
            const newUser = await userService.createUser(email, password, name);
            res.status(201).json({
                message: "User created successfully",
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    createdAt: newUser.createdAt
                }
            });

        } catch (error) {
            if (error instanceof UserValidationError) {
                res.status(400).json({message: 'Validation Error', error: error.message});
            } else {
                console.error('❌ Error creating user:', error);
                res.status(500).json({message: 'Internal Server Error'});
            }

        }
    })

    app.use((req, res) => {
        console.log('No route matched:', req.method, req.path);
        res.status(404).json({message: `Cannot ${req.method} ${req.path}`});
    });


    return app;
}

