import { Router } from "express";
import * as controller from '../controller/auth'
const authController = controller.default
export const authRoute = Router()


authRoute.post('/create', authController.createUser)
authRoute.post('/login', authController.loginController)
