import Client, {resetDatabase} from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {UserStore} from "../models/user";

dotenv.config();

const userStore = new UserStore();

describe('User Model', () => {
    beforeAll(async () => {
        await resetDatabase()
    });

    describe('Method: index', () => {
        it('should return an empty array when no users exist', async () => {
            const result = await userStore.index();
            expect(result).toEqual([]);
        });

        it('should return all users', async () => {
            await userStore.create({firstName: 'John', lastName: 'Doe', password: 'password123'});
            const result = await userStore.index();
            expect(result).toEqual(jasmine.arrayContaining([{
                id: jasmine.any(Number),
                firstName: 'John',
                lastName: 'Doe',
                password: jasmine.any(String)
            }]));
        });
    });

    describe('Method: create', () => {
        it('should add a user and return the new user with an id', async () => {
            const result = await userStore.create({firstName: 'Jane', lastName: 'Doe', password: 'password123'});
            expect(result).toEqual(jasmine.objectContaining({
                id: jasmine.any(Number),
                firstName: 'Jane',
                lastName: 'Doe'
            }));
        });

        it('should hash the user\'s password', async () => {
            const user = await userStore.create({firstName: 'Hash', lastName: 'Test', password: 'testPassword'});
            const {BCRYPT_PASSWORD: pepper, SALT_ROUNDS} = process.env;
            const hash = bcrypt.hashSync('testPassword' + pepper, parseInt(process.env.SALT_ROUNDS as string));
            expect(user.password).not.toEqual('testPassword');
            expect(bcrypt.compareSync('testPassword' + pepper, user.password)).toBeTrue();
        });
    });

    describe('Method: show', () => {
        it('should return null for a non-existent user', async () => {
            const result = await userStore.show('9999');
            expect(result).toBeUndefined();
        });

        it('should return the correct user when given an existing id', async () => {
            const newUser = await userStore.create({firstName: 'Show', lastName: 'Test', password: 'showPassword'});
            // @ts-ignore
            const result = await userStore.show(newUser.id.toString());
            expect(result).toEqual(jasmine.objectContaining({
                id: newUser.id,
                firstName: 'Show',
                lastName: 'Test'
            }));
        });
    });
});