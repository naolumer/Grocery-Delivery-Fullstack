import express from "express"
import { loginController,registerUser,adminLoginController } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/login",loginController)
userRouter.post("/register",registerUser)
userRouter.post("/admin/login", adminLoginController)

export default userRouter