import express from "express"
import cartController from "../controllers/cartController.js"
import { userAuth } from "../middlewares/authUser.js"


const cartRouter = express.Router()

cartRouter.get("/get-cart",userAuth, cartController.getCart )
cartRouter.delete("/delete")
cartRouter.post()