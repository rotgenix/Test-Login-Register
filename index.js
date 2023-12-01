import express from 'express';

const app = express();

import { UserRoutes } from './routes/UserRoutes.js';
import { connectMongo } from './Database/ConnectDB.js';
import { PostRoutes } from './routes/PostRoutes.js';
import cookieParser from 'cookie-parser';
// import ''

import { config } from 'dotenv';

config({
    path: './Dotenv/config.env'
})
console.log(process.env.JWT_SECRET);
app.use(cookieParser());

app.use(express.json());
app.use("/user", UserRoutes);
app.use("/post", PostRoutes);


//ConnectDB
connectMongo();


app.listen(5000, () => {
    console.log("Server Ready");
})