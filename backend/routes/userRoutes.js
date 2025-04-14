import express from "express"
import { loginController,registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/login",loginController)
userRouter.post("/register",registerUser)

export default userRouter