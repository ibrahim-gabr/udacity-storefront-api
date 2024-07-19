import Client from '../database'
import {Product} from "./product";

export type Order = {
    id: number;
    user_id: string;
    status: 'active' | 'complete';
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM orders'

            const result = await conn.query(query)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM orders where id=$1 AND status=$2';
            const result = await conn.query(query, [id, 'active'])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get order. Error: ${err}`)
        }
    }

    async getCurrentUserOrder(user_id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM orders where user_id=$1 AND status=$2';
            const result = await conn.query(query, [user_id, 'active'])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async create({user_id, product_id, quantity}: {
        user_id: string;
        product_id: string,
        quantity: number
    }): Promise<Product> {
        try {
            const conn = await Client.connect()
            const query = 'insert into orders (user_id, status) values ($1,$2) RETURNING *'
            const result = await conn.query(query, [user_id, 'active'])
            const order_id = result.rows[0].id

            const query2 = 'insert into orders_products (product_id, order_id, quantity) VALUES ($1,$2,$3) RETURNING *'

            const result2 = await conn.query(query2, [product_id, order_id, quantity])

            conn.release()

            return result2.rows[0]
        } catch (err) {
            throw new Error(`Could not create order. Error: ${err}`)
        }
    }

}