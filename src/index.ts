import {DatabaseConnection} from './infrastructure/database/DatabaseConnection';

async function bootstrap() {
    try {
        await DatabaseConnection.initialize();
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

bootstrap();
