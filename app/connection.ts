import { Pool } from 'pg';

const dbServer = process.env.POSTGRES_DB
const dbPassword = process.env.POSTGRES_PASSWORD

export const createPool = () => {
    const pool = new Pool({
        host: dbServer,
        database: 'postgres',
        user: 'postgres',
        password: dbPassword,
        port: 5432,
        max: 10,
        idleTimeoutMillis: 60000,
        connectionTimeoutMillis: 10000,
    });

    return pool;
}