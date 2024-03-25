import express from 'express';
import request from "supertest";
import { connection, disconnect, connect } from "mongoose";
import jwt from "jsonwebtoken";
import { IAsset } from "../models/assets_model";
import axios from "axios";
import { app } from '../app'
import mongoose from 'mongoose';





const updateAsset = {
  "address": "test address update",
  "price": 123489,
  "fileName": "housePhoto"
}

const newAsset = {
  "address": "test address new",
  "price": 112233,
  "fileName": "housePhoto2"
}


let assetid = "65a6ab8a48eab7edddb9b1d0";

afterAll(async () => {
  await mongoose.connection.close();
});



describe('Asset Tests', () => {



  it("test get all assets", async () => {
    const response = await request(app)
      .get('/assets/')
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });



  it("test get Asset By Id", async () => {
    const response = await request(app)
      .get("/assets/" + assetid)

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
  });



  it("test Create Asset", async () => {

    const response1 = await request(app)
      .post("/assets/addAsset")
      .send({ "asset": newAsset});
    expect(response1.statusCode).toEqual(200);
    expect(response1.body).toBeDefined();


    const response2 = await request(app)
      .put("/assets?assetId=" + response1.body._id)
      .send({ "asset": updateAsset});
    expect(response2.statusCode).toEqual(200);
    expect(response2.body).toBeDefined();



    const response = await request(app)
      .delete("/assets?assetId=" + response1.body._id)
    // .set('Authorization', 'Bearer ' + jwt.sign({ email: asset.email }, 'secret'));
    expect(response.statusCode).toEqual(200);




  });










});





