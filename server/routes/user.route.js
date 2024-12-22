import { Router } from "express";
import { loginController, logoutController, registerUserController, uploadAvatar, verifyEmailController } from "../Controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verify_email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', auth, logoutController)
userRouter.post('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)

export default userRouter

