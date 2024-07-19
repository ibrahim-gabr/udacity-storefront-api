import express, {Request, Response} from "express";
import {OrderStore} from "../models/order";
import {verifyAuthToken} from "../middlewares";


const store = new OrderStore()

const index = async (_req: express.Request, res: express.Response) => {
    const orders = await store.index()
    res.send(orders);
}

const show = async (req: Request, res: Response) => {
    const {id} = req.params
    const orders = await store.show(id)
    res.send(orders);
}

const create = async (req: Request, res: Response) => {
    const {user_id,product_id,quantity} = req.body
    const order = await store.create({
        user_id,product_id,quantity
    })
    res.send(order);
}

const getCurrentUserOrder = async(req:Request,res:Response) => {
    const {user_id} = req.params
    const orders = await store.getCurrentUserOrder(user_id)
    res.send(orders)
}


const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.get('/orders/user/:user_id', verifyAuthToken, getCurrentUserOrder)
    app.post('/orders', verifyAuthToken, create)
}

export default orderRoutes