'use strict';
const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe('Server testing', () => {



    it('Should respond with 404 status on an invalid method', async () => {
        const response = await mockRequest.get('/notfound');
        expect(response.status).toBe(404);
    });
    //---------------------------------------------------------------------------------------
    it('should respond with 400 on an error', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });
    test('POST to /signup to create a new user', async () => {
        const res = await mockRequest.post('/sing-up').send({
            username: "john",
            password: "foo"
        });

        expect(res.status).toBe(201);
    })

    test('POST to /signin to login as a user', async () => {
    

        
        let res = await mockRequest.post('/sing-in').auth("john", "foo");

        expect(res.status).toBe(200);
    })

})