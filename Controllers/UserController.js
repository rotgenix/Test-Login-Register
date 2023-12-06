import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../Database/Models/Models.js';

//login controller
export const loginController = async (req, res) => {
    const {
        username,
        password,
    } = req.body;

    let userLogin = await UserModel.findOne({ username });

    if (userLogin) {
        //checking hashed password and user entered password
        const passMatch = await bcrypt.compare(password, userLogin.password);
        if (passMatch) {

            const token = jwt.sign({ _id: userLogin._id }, process.env.JWT_SECRET);

            res.status(201).cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true,
            }).json({
                success: 'true',
                messsage: "You are Logged in Successfully",
                userLogin
            })
        }
        else {
            res.json({
                success: 'false',
                messsage: "Invalid ID or Pass",
            })
        }
    }
    else {
        res.json({
            success: 'false',
            messsage: "User Not Registered. Please Register",
        })
    }
}

//register function
export const registerController = async (req, res) => {
    const {
        email,
        password,
        username
    } = req.body;

    let usernameCheck = await UserModel.findOne({ username });
    //Username not exists
    if (usernameCheck) {
        res.json({
            success: false,
            messsage: "Username already exists please choose another",
        })
    }
    else {  //username exists
        let userEmail = await UserModel.findOne({ email });
        //email exists
        if (userEmail) {
            res.json({
                success: 'false',
                messsage: "Email Already Exists Plese Login!",
            })
        }
        else { //email not exists

            //Password hashing
            const encryptesPassword = await bcrypt.hash(password, 10);

            let createdUser = await UserModel.create({
                username,
                email,
                password: encryptesPassword,
            })

            //JWT token
            const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true,
            }).json({
                success: 'true',
                messsage: "User Registered Successfully",
                createdUser
            })
        }
    }
}

//forgot password function
export const forgotPasswordController = async (req, res) => {
    const {
        email,
        username,
        newpassword

    } = req.body;

    let userLogin = await UserModel.findOne({ email });

    if (userLogin) {

        if (userLogin.email === email && userLogin.username === username) {

            const encryptesPassword = await bcrypt.hash(newpassword, 10);
            // console.log("update")
            // console.log("111")
            let userLogin = await UserModel.findOneAndUpdate({ email }, {
                username, email,
                password: encryptesPassword
            });
            // console.log("update")
            res.json({
                success: 'true',
                messsage: "Passowrd reset Successfully",
            })
        }
        else {
            res.json({
                success: 'false',
                messsage: "Invalid Username/Email Combination",
            })
        }
    }
    else {
        res.json({
            success: 'false',
            messsage: "Email Doesn't Exists",
        })
    }
}

//user Log Out function
export const logOutController = async (req, res) => {
    try {
        res.status(201).cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,
        }).json({
            success: 'true',
            messsage: "You are Logged out Successfully",
            // userLogin
        })
    } catch (error) {
        res.json({
            success: false,
            messsage: "You are Logged out Successfully",
        })
    }
}