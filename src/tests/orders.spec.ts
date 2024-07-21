import {OrderStore} from "../models/order";
import {UserStore} from "../models/user";
import {ProductStore} from "../models/product";
import client, {resetDatabase} from "../database";


const store = new OrderStore()
const name = 'Test Product';
const price = 99;
const productStore = new ProductStore();
beforeAll(async () => {
    await resetDatabase();
});

describe("Order Model", () => {

    describe('create method', () => {
            it('create method should add a order', async () => {
                let product = await productStore.create({name, price})
                const userStore = new UserStore();
                const user = await userStore.create({firstName: 'ibrahim', lastName: "gabr", password: 'password'})
                const result = await store.create({
                    user_id: user.id as number,
                    product_id: product.id,
                    quantity: 2
                });

                expect(result).toEqual({
                    id: 1,
                    user_id: user.id as number,
                    status: 'active',
                    product_id: product.id,
                    quantity: 2
                });

            });
        }
    );

    describe('index method', () => {
            it('index method should return a list of orders', async () => {
                const result = await store.index();
                expect(result).toEqual([{
                    id: jasmine.any(Number),
                    user_id: 1,
                    status: 'active',
                }]);
            });
        }
    );

    describe('show method', () => {
        it('show method should return the correct order', async () => {
            const result = await store.show("1");
            expect(result).toEqual({
                id: 1,
                user_id: 1,
                status: 'active',
                product_id: 1,
                quantity: 2
            });
        });
    });


});