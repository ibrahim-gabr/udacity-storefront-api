require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres', // Connect to the default database to manage databases
    port: 5432,
});

async function createTestDatabase() {
    const dbName = process.env.POSTGRES_TEST_DB;
    try {
        // Check if the test database exists
        const res = await pool.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
        if (res.rowCount === 0) {
            // Create the test database if it does not exist
            await pool.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (err) {
        console.error(`Could not prepare test database. Error:`, err.message);
    } finally {
        await pool.end();
    }
}

createTestDatabase();