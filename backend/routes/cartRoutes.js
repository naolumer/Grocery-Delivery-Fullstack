import express from "express"
import cartController from "../controllers/cartController.js"
import { userAuth } from "../middlewares/authUser.js"


const cartRouter = express.Router()

cartRouter.get("/get-cart", cartController.getCart )
cartRouter.delete("/delete/:itemId",cartController.removeItem)
cartRouter.post("/add",cartController.addItem)
cartRouter.put("/update",cartController.updateQuantity)