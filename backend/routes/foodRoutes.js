import express from "express"
import { getAllProducts } from "../controllers/foodController"



const foodRouter = express.Router()


foodRouter.get("/get-allfoods",getAllProducts)

export default foodRouter