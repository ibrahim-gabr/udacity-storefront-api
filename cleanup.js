require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres', // Connect to the default database to drop the test database
    port: 5432,
});

async function dropTestDatabase() {
    try {
        await pool.query(`DROP DATABASE IF EXISTS "${process.env.POSTGRES_TEST_DB}"`);
        console.log('Test database dropped successfully.');
    } catch (err) {
        console.error('Could not drop test database. Error:', err.message);
    } finally {
        await pool.end();
    }
}

dropTestDatabase();