import mongoose from "mongoose";

export const postSchema = mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },
    imgAddress: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true
    },
    likedBy: {
        type: Array,
    },
    comments: {
        type: Array,
    },
})

