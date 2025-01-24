import {DatabaseConnection} from './infrastructure/database/DatabaseConnection';
import {createServer} from './api/server';

async function bootstrap() {
    try {
        await DatabaseConnection.initialize();
        console.log('✅ Database initialized successfully and schema updated');
        const app = createServer();
        const port = 3000;
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

bootstrap();
