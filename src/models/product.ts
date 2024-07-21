import Client from '../database'

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM products'

            const result = await conn.query(query)

            conn.release()

            return result.rows.map(product => ({
                ...product,
                price: parseInt(product.price),
            }));

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product | null> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM products where id=$1'

            const result = await conn.query(query, [id])
            conn.release()
            if (result.rows.length === 0) {
                return null
            }
            return {
                ...result.rows[0],
                price: parseInt(result.rows[0].price)
            }
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async create({name, price}: { name: string; price: number }): Promise<Product> {
        try {
            const conn = await Client.connect()
            const query = 'insert into products (name, price) values ($1, $2) RETURNING *'

            const result = await conn.query(query, [name, price])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }
}