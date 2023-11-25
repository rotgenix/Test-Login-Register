import express from 'express'
import { forgotPasswordController, loginController, registerController } from '../Controllers/UserController.js';

export const UserRoutes = express.Router();

UserRoutes.post('/login', loginController);
UserRoutes.post('/register', registerController);
UserRoutes.put('/forgotpassword', forgotPasswordController);