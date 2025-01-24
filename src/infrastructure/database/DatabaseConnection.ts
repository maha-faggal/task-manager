import {EntityManager, MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {User} from '../../core/entities/User';
import {Task} from '../../core/entities/Task';


export class DatabaseConnection {

    private static instance: DatabaseConnection;
    private orm!: MikroORM;

    private constructor() {
    }

    public static async initialize(): Promise<void> {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            await DatabaseConnection.instance.connect();
            const generator = DatabaseConnection.instance.orm.getSchemaGenerator();
            await generator.updateSchema();  // This creates/updates tables

        }
    }

    public static async getInstance(): Promise<DatabaseConnection> {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            await DatabaseConnection.instance.connect();
        }
        return DatabaseConnection.instance;
    }


    private async connect(): Promise<void> {
        this.orm = await MikroORM.init<PostgreSqlDriver>({
            entities: [User, Task],
            dbName: 'taskmanager',
            host: 'localhost',
            driver: PostgreSqlDriver,
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            debug: true,

        });
    }

    public getORM(): MikroORM {
        return this.orm;
    }

    public getEntityManager(): EntityManager {
        return this.orm.em.fork();
    }

    public async closeConnection(): Promise<void> {
        await this.orm.close();
    }
}
