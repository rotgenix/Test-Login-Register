import mongoose from "mongoose";

export const connectMongo = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017", {
            dbName: "TestDB",
        })
        .then((c) => {
            console.log('Connected to DB');
        })
        .catch((e) => {
            // console.log(e);
        })
}