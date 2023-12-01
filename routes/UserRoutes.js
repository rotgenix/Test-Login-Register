import express from 'express'
import { forgotPasswordController, logOutController, loginController, registerController } from '../Controllers/UserController.js';
import { checkLogin } from '../Utils/CheckLogin.js';

export const UserRoutes = express.Router();

UserRoutes.post('/login', loginController);
UserRoutes.post('/register', registerController);
UserRoutes.put('/forgotpassword', forgotPasswordController);
UserRoutes.get('/logout', checkLogin, logOutController);