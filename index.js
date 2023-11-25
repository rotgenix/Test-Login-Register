import express from 'express'

const app = express();

import { UserRoutes } from './routes/UserRoutes.js';
import { connectMongo } from './Database/ConnectDB.js';

app.use(express.json());
app.use(UserRoutes);


//ConnectDB
connectMongo();


app.listen(5000, () => {
    console.log("Server Ready");
})