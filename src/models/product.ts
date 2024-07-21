import Client from '../database'

export type Product = {
    id: number;
    name: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM products'

            const result = await conn.query(query)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product | string> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM products where id=$1'

            const result = await conn.query(query, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async create({name}: { name: string }): Promise<Product> {
        try {
            const conn = await Client.connect()
            const query = 'insert into products (name) values ($1) RETURNING *'

            const result = await conn.query(query, [name])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }
}