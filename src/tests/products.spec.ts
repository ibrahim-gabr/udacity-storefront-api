import { ProductStore, Product } from '../models/product';
import Client, {resetDatabase} from '../database';
import {UserStore} from "../models/user";
import client from "../database";

const store = new ProductStore()
const name = 'Test Product';

beforeAll(async () => {
    await resetDatabase()
});

describe('ProductStore Tests', () => {
    describe('create method', () => {
        it('adds a new product and returns it', async () => {
            const result = await store.create({ name });
            expect(result.name).toEqual(name);
        });

    });

    describe('index method', () => {
        it('returns a list of products', async () => {
           const products = await store.index();
              expect(products).toEqual(jasmine.objectContaining([{
                id: jasmine.any(Number),
                name
            }]));
        });
    });

    describe('show method', () => {
        it('returns a single product by id', async () => {
            const result = await store.show('1');
            expect(result).toEqual({ id: 1, name });
        });

        it('returns undefined for a non-existent product id', async () => {
            const result = await store.show('999');
            expect(result).toEqual('Product not found');
        });
    });


});