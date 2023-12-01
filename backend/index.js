import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import userroutes from './userroutes.js';
import productroutes from './productroutes.js'

const app=express();

app.use(express.json({limit: '25mb'}));

app.use(cors());

app.use('/users', userroutes);
app.use('/products', productroutes);

mongoose.connect('mongodb+srv://uddhika:1234@cluster0.chybuzw.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('connected to the database');
    app.listen(5555,()=>{
        console.log('connected to port');
    });
}).catch((error) => {
    console.log('not connected to database');
});