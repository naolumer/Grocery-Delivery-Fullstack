import express from "express"
import cartController from "../controllers/cartController.js"
import { userAuth } from "../middlewares/authUser.js"


const cartRouter = express.Router()

cartRouter.get("/get-cart", userAuth, cartController.getCart )
cartRouter.delete("/delete/:itemId", userAuth,cartController.removeItem)
cartRouter.post("/add", userAuth,cartController.addItem)
cartRouter.put("/update/:itemId", userAuth,cartController.updateQuantity)