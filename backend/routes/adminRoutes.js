import express from "express"
import {addFoodController, adminLoginController, verifyTokenController } from "../controllers/adminController.js"
import { adminAuth } from "../middlewares/authAdmin.js"
import upload from "../middlewares/multer.js"

const adminRouter = express.Router()

adminRouter.post("/login", adminLoginController)
adminRouter.post("/verify",verifyTokenController)
adminRouter.post("/add-food",adminAuth,upload.array("images",4),addFoodController)

export default adminRouter