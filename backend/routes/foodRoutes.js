import express from "express"
import { getAllProducts } from "../controllers/foodController.js"



const foodRouter = express.Router()


foodRouter.get("/get-allfood",getAllProducts)

export default foodRouter