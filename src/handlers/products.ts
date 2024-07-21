import {ProductStore} from "../models/product";
import express, {Request, Response} from "express";
import {verifyAuthToken} from "../middlewares";


const store = new ProductStore()

const index = async (_req: express.Request, res: express.Response) => {
    const products = await store.index()
    res.send(products);
}

const show = async (req: Request, res: Response) => {
    const {id} = req.params
    const products = await store.show(id)
    res.send(products);
}

const create = async (req: Request, res: Response) => {
    const {name,price} = req.body
    const products = await store.create({
        name,
        price
    })
    res.send(products);
}


const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
}

export default productRoutes