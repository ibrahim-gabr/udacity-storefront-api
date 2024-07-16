import Client from '../database'
import bcrypt from 'bcrypt';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM users'

            const result = await conn.query(query)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const {BCRYPT_PASSWORD: pepper, SALT_ROUNDS} = process.env;
            const conn = await Client.connect()
            //@ts-ignore
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(SALT_ROUNDS))
            const query = `insert into users ("firstName", "lastName", password) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(query,[user.firstName,user.lastName,hash])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id:string): Promise<User> {
        try {
            const conn = await Client.connect()
            const query = 'SELECT * FROM users where id=$1'

            const result = await conn.query(query,[id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
}