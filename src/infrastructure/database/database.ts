import {MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {User} from '../../core/entities/User';
import {Task} from '../../core/entities/Task';


export const initializeDatabase = async () => {
    const orm = await MikroORM.init<PostgreSqlDriver>({
        entities: [User, Task],
        dbName: 'taskmanager',
        host: 'localhost',
        driver: PostgreSqlDriver,
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        debug: true,

    });
    return orm;

};
