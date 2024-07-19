import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from "./handlers/products";
import userRoutes from "./handlers/users";
import orderRoutes from "./handlers/orders";

const app: express.Application = express()
const address: string = "0.0.0.0:9000"

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

productRoutes(app);
userRoutes(app)
orderRoutes(app)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(9000, function () {
    console.log(`starting app on: ${address}`)
})
