import express, {Request, Response, NextFunction} from "express";
import {User, UserStore} from "../models/user";
import jwt from 'jsonwebtoken';
import {verifyAuthToken} from "../middlewares";

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.send(users);
}

const show = async (req: Request, res: Response) => {
    const {id} = req.params
    const user = await store.show(id)
    res.send(user);
}

const create = async (req: Request, res: Response) => {
    const user: User = {firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password}
    try {
        const newUser = await store.create(user)
        var token = jwt.sign({
            user: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                id: newUser.id
            }
        }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err as string)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
}

export default userRoutes