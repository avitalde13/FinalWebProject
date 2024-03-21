const { app, startServer, stopServer } = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/user_controller');
const User = require('../models/user_model');

const user = {
    name: 'test',
    email: 'test@test.com',
    password: 'test'
}
let userid: any;



beforeAll(async () => {
    await startServer();
});

afterAll(async () => {
    await stopServer();
});



describe('User Tests', () => {
    it("test CreateUser", async () => {
        const response = await request(app)
            .post("/user/register")
            .send({ user });
        expect(response.statusCode).toEqual(200);
        userid = response.body._id;
    })
    it("test Login", async () => {
        const response = await request(app)
            .post("/user/login")
            .send({ email: user.email, password: user.password });
        expect(response.statusCode).toEqual(200);
    })
    it("test UserInfo", async () => {
        const response = await request(app)
            .get("/user/info")
            .set('Authorization', 'Bearer ' + jwt.sign({ email: user.email }, 'secret'));
        expect(response.statusCode).toEqual(200);
    })
    it("test deleteUser", async () => {
        const response = await request(app)
            .delete("/user/deleteUser/" + userid)
            .set('Authorization', 'Bearer ' + jwt.sign({ email: user.email }, 'secret'));
        expect(response.statusCode).toEqual(200);
    })
    it("updateUser", async () => {
        const response = await request(app)
            .put("/user/" + userid)
            .set('Authorization', 'Bearer ' + jwt.sign({
                email: user.email
            }, 'secret'))
            .send({ name: 'test2' });
        expect(response.statusCode).toEqual(200);

    })
    it("addAssetToUser", async () => {
        const response = await request(app)
            .post("/user/addAssetToUser")
            .set('Authorization', 'Bearer ' + jwt.sign({ email: user.email }, 'secret'))
            .send({ assetId: '123', userId: userid });
        expect(response.statusCode).toEqual(200);
    }
    )
})


