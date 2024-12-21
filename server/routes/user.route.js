import { Router } from "express";
import { registerUserController, verifyEmailController } from "../Controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verify_email', verifyEmailController )

export default userRouter

