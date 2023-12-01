import mongoose from "mongoose";
import { userSchema } from "../Schemas/UserSchema.js";
import { postSchema } from "../Schemas/PostSchema.js";

export const UserModel = mongoose.model("User", userSchema);

export const PostModel = mongoose.model("Post", postSchema);