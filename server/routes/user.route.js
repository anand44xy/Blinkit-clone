import { Router } from "express";
import { loginController, registerUserController, verifyEmailController } from "../Controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verify_email', verifyEmailController)
userRouter.post('/login', loginController)

export default userRouter

