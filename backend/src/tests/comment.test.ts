// // import { app, startServer, stopServer } from '../app';
// import request from 'supertest';
// import mongoose, { connect } from 'mongoose';
// import jwt from 'jsonwebtoken';
// import UserController from '../controllers/user_controller';
// import User from '../models/user_model';
// import { app, connectDB } from '../app';
// import { response } from 'express';


// let assetId1: string;

// assetId1 = "65a6ab8a48eab7edddb9b1dd";

// const text: string = "AvitalTestC";


// const updateComment = {
//     "text": "AvitalTestUpdateC",
//     "assetid": "testUpdateC@gmail.com",
//     "userId": "TestTestUpdateC"
// }

// const newComment = {
//     "text": "AvitalTestnewC",
//     "assetid": assetId1,
//     "userId": "TestneweC"
// }


// const newUser = {
//     "name": "AvitalTestNewForC",
//     "email": "testNewForC@gmail.com",
//     "password": "TestTestNewForC"
// }

// const newUser2 = {
//     "name": '',
//     "email": "testNew@gmail.com",
//     "password": "TestTestNew"
// }

// let userId1: any;


// beforeAll(async () => {
//     connectDB();
// });

// afterAll(async () => {
//     // const deleteUser = await User.findByIdAndDelete(userResponseId);
//     // expect(deleteUser).toBeDefined();
//     await mongoose.connection.close();
// });



// describe('User Tests', () => {


    
    // it("test CreateUserForC", async () => {
    //     const response1 = await request(app)
    //         .post("/users/register")
    //         .send({ "user": newUser });
    //     userId1= response1.body._id;
    //     expect(response1.statusCode).toEqual(200);
    //     expect(response1.body).toBeDefined();
    // });


    // it("test LoginForC", async () => {
    //     const response = await request(app)
    //         .post("/users/login")
    //         .send({ email:  "testNewForC@gmail.com", password: "TestTestNewForC" });
    //     expect(response.statusCode).toEqual(200);

    // });


    // it("test Add Comment", async () => {

    //     const response = await request(app)
    //         .post("/comments/addComment")
    //         .send( {
    //             "text": text,
    //             "assetId": assetId1,
    //             "userId": userId1
    //         });
    //     expect(response.statusCode).toEqual(200);
    //     expect(response.body).toBeDefined();
    // });


//     it("test remove Asset From User", async () => {

//         const response = await request(app)
//             .delete("/users/removeAsset")
//             .send({ "asset": asset, id: userId });
//         expect(response.statusCode).toEqual(200);
//     });



//     it("test Get All Users", async () => {

//         const response = await request(app)
//             .get("/users/getAll")
//         expect(response.statusCode).toEqual(200);
//     });


//     // it("test Get User Info", async () => {

//     //     const response = await request(app)
//     //         .get("/users/info")
//     //         .send({ "user": newUser });
//     //     expect(response.statusCode).toEqual(200);
//     // });




//     it("test Update User", async () => {
//         const response = await request(app)
//             .put("/users/" + userId)
//             .send({ "user": updateUser });
//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toBeDefined();


//     });


//     it("test Delete User", async () => {
//         const response2 = await request(app)
//             .delete("/users/deleteUser/" + userId)
//         // .set('Authorization', 'Bearer ' + jwt.sign({ email: newUser.email }, 'secret'));
//         expect(response2.statusCode).toEqual(200);
//         expect(response2.body).toBeDefined();
//     });


//     // it("test UserInfo", async () => {
//     //     const response = await request(app)
//     //         .get("/user/info")
//     //         .set('Authorization', 'Bearer ' + jwt.sign({ email: user.email }, 'secret'));
//     //     expect(response.statusCode).toEqual(200);
//     // })

//     // it("updateUser", async () => {
//     //     const response = await request(app)
//     //         .put("/user/" + userid)
//     //         .set('Authorization', 'Bearer ' + jwt.sign({
//     //             email: user.email
//     //         }, 'secret'))
//     //         .send({ name: 'test2' });
//     //     expect(response.statusCode).toEqual(200);


// });

// describe('User Tests Fail', () => {

// it("test CreateUser Fail", async () => {
//     const response = await request(app)
//         .post("/users/register")
//         .send({ "user": newUser2 });
//     // userId = response1.body._id;
//     expect(response.statusCode).toEqual(500);
//     expect(response.body).toBeDefined();
// });





// it("test Login", async () => {
//     const response = await request(app)
//         .post("/users/login")
//         .send({ email: "testNewgmail.com", password: "TestTestNew" });
//     expect(response.statusCode).toEqual(401);

// });




////



// const asset = "6601c13d3e66981cd8ff6df9";


// it("test add Asset To User", async () => {

//     const response = await request(app)
//         .post("/users/addAssetToUser")
//         .send({ "asset": asset, id: userId });
//     expect(response.statusCode).toEqual(200);
// });


// it("test remove Asset From User", async () => {

//     const response = await request(app)
//         .delete("/users/removeAsset")
//         .send({ "asset": asset, id: userId });
//     expect(response.statusCode).toEqual(200);
// });



// it("test Get All Users", async () => {

//     const response = await request(app)
//         .get("/users/getAll")
//     expect(response.statusCode).toEqual(200);
// });


// // it("test Get User Info", async () => {

// //     const response = await request(app)
// //         .get("/users/info")
// //         .send({ "user": newUser });
// //     expect(response.statusCode).toEqual(200);
// // });




// it("test Update User", async () => {
//     const response = await request(app)
//         .put("/users/" + userId)
//         .send({ "user": updateUser });
//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toBeDefined();


// });


// it("test Delete User", async () => {
//     const response2 = await request(app)
//         .delete("/users/deleteUser/" + userId)
//     // .set('Authorization', 'Bearer ' + jwt.sign({ email: newUser.email }, 'secret'));
//     expect(response2.statusCode).toEqual(200);
//     expect(response2.body).toBeDefined();
// });



// });




