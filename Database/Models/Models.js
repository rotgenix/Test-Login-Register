import mongoose, { mongo } from "mongoose";
import { userSchema } from "../Schemas/UserSchema.js";

export const UserModel = mongoose.model("User", userSchema)