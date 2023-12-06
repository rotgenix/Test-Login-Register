import express from 'express'
import { forgotPasswordController, logOutController, loginController, registerController } from '../Controllers/UserController.js';
import { checkLogin } from '../Utils/CheckLogin.js';
import { checkCookie } from '../Utils/CheckCookie.js';

export const UserRoutes = express.Router();

UserRoutes.post('/login', checkCookie, loginController);

UserRoutes.post('/register', checkCookie, registerController);
UserRoutes.put('/forgotpassword', forgotPasswordController);

UserRoutes.get('/logout', checkLogin, logOutController);