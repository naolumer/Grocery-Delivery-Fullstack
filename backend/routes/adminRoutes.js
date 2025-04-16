import express from "express"
import {adminLoginController, verifyTokenController } from "../controllers/adminController.js"

const adminRouter = express.Router()

adminRouter.post("/login", adminLoginController)
adminRouter.post("/verify",verifyTokenController)

export default adminRouter