import {OrderStore} from "../models/order";
import {UserStore} from "../models/user";
import {ProductStore} from "../models/product";
import client, {resetDatabase} from "../database";


const store = new OrderStore()

const productStore = new ProductStore();
beforeAll(async () => {
    await resetDatabase();
});

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a getCurrentUserOrder method', () => {
        expect(store.getCurrentUserOrder).toBeDefined();
    });


    it('create method should add a order', async () => {
        let product = await productStore.create({name: "Test Product"})
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

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: jasmine.any(Number),
            user_id: 1,
            status: 'active',
        }]);
    });

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