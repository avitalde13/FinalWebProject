// import { app, startServer, stopServer } from '../app';
import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/user_controller';
import User from '../models/user_model';
import { app } from '../app';
import { response } from 'express';



const updateUser = {
    "name": "AvitalTestUpdate",
    "email": "testUpdate@gmail.com",
    "password": "TestTestUpdate"
}

const newUser = {
    "name": "AvitalTestNew",
    "email": "testNew@gmail.com",
    "password": "TestTestNew"
}

let userId;
let asset;





afterAll(async () => {
    // const deleteUser = await User.findByIdAndDelete(userResponseId);
    // expect(deleteUser).toBeDefined();
    await mongoose.connection.close();
});



describe('User Tests', () => {
    it("test CreateUser", async () => {
        const response1 = await request(app)
            .post("/users/register")
            .send({ "user": newUser });
        userId = response1.body._id;
        expect(response1.statusCode).toEqual(200);
        expect(response1.body).toBeDefined();
    });

    



    it("test Login", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({ email: "testNew@gmail.com", password: "TestTestNew" });
        expect(response.statusCode).toEqual(200);

    });


    const asset= "6601c13d3e66981cd8ff6df9" ;


    it("test add Asset To User", async () => {

        const response = await request(app)
            .post("/users/addAssetToUser")
            .send({ "asset": asset,  id : userId });
        expect(response.statusCode).toEqual(200);
    });


    it("test remove Asset From User", async () => {

        const response = await request(app)
            .delete("/users/removeAsset")
            .send({ "asset": asset,  id : userId });
        expect(response.statusCode).toEqual(200);
    });



    it("test Get All Users", async () => {

        const response = await request(app)
            .get("/users/getAll")
        expect(response.statusCode).toEqual(200);
    });


    // it("test Get User Info", async () => {

    //     const response = await request(app)
    //         .get("/users/info")
    //         .send({ "user": newUser });
    //     expect(response.statusCode).toEqual(200);
    // });






    it("test Delete User", async () => {
    const response2 = await request(app)
        .delete("/users/deleteUser/" + userId)
    // .set('Authorization', 'Bearer ' + jwt.sign({ email: newUser.email }, 'secret'));
    expect(response2.statusCode).toEqual(200);
    expect(response2.body).toBeDefined();
});

// it("test Update User", async () => {


// });






    // it("test UserInfo", async () => {
    //     const response = await request(app)
    //         .get("/user/info")
    //         .set('Authorization', 'Bearer ' + jwt.sign({ email: user.email }, 'secret'));
    //     expect(response.statusCode).toEqual(200);
    // })

    // it("updateUser", async () => {
    //     const response = await request(app)
    //         .put("/user/" + userid)
    //         .set('Authorization', 'Bearer ' + jwt.sign({
    //             email: user.email
    //         }, 'secret'))
    //         .send({ name: 'test2' });
    //     expect(response.statusCode).toEqual(200);


});








