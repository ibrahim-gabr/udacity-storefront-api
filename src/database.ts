import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV
} = process.env

let client: Pool = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export async function resetDatabase() {
    const conn = await client.connect();
    try {
        await conn.query('BEGIN');

        await conn.query('TRUNCATE TABLE orders_products RESTART IDENTITY CASCADE;');
        await conn.query('TRUNCATE TABLE orders RESTART IDENTITY CASCADE;');
        await conn.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE;');
        await conn.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');

        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK');
        throw error;
    } finally {
        conn.release();
    }
}
export default client