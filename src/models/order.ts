import Client from '../database'
import {Product} from "./product";

export type Order = {
    id: number ;
    user_id: number ;
    status: 'active' | 'complete';
    product_id?: number ;
    quantity?: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM orders'

            const result = await conn.query(query)

            conn.release()

            return result.rows.map(order => ({
                ...order,
                user_id: parseInt(order.user_id),
            }));
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }


    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM orders INNER join orders_products on orders.id = orders_products.order_id where orders.id=$1';
            const result = await conn.query(query, [id])

            conn.release()
            return {
                id: parseInt(result.rows[0].id),
                user_id: parseInt(result.rows[0].user_id),
                status:result.rows[0].status,
                product_id:parseInt(result.rows[0].product_id),
                quantity:result.rows[0].quantity
            }
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
        user_id: number;
        product_id: number,
        quantity: number
    }): Promise<Order & {product_id:number;quantity:number}> {
        try {
            const conn = await Client.connect()
            const query = 'insert into orders (user_id, status) values ($1,$2) RETURNING *'
            const result = await conn.query(query, [user_id, 'active'])
            const order_id = result.rows[0].id

            const query2 = 'insert into orders_products (product_id, order_id, quantity) VALUES ($1,$2,$3) RETURNING *'
            const result2 = await conn.query(query2, [product_id, order_id, quantity])
            conn.release()
            return {
                id: parseInt(result2.rows[0].order_id),
                user_id: parseInt(result.rows[0].user_id),
                status:result.rows[0].status,
                product_id:parseInt(result2.rows[0].product_id),
                quantity:result2.rows[0].quantity
            }
        } catch (err) {
            throw new Error(`Could not create order. Error: ${err}`)
        }
    }

}