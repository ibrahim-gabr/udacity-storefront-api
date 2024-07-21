import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} = process.env;
console.log({ENV})
const databaseName = ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB;
console.log({databaseName})

const client: Pool = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: 'postgres',
    port: 5432,
});

async function createDatabaseIfNotExists() {
    const conn = await client.connect();
    try {
        const res = await client.query(`SELECT 1
                                        FROM pg_database
                                        WHERE datname = '${databaseName}'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${databaseName}"`);
            console.log(`Database ${databaseName} created.`);
        } else {
            console.log(`Database ${databaseName} already exists.`);
        }
    } catch (error) {
        console.error('Could not connect to PostgreSQL', error);
    } finally {
        conn.release();
        await client.end()
        console.log('Operation completed.');
        process.exit(0); // Ensure the process exits
    }
}

createDatabaseIfNotExists();