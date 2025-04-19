import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/userRoutes.js"
import connectDB from "./config/db.js"
import adminRouter from "./routes/adminRoutes.js"
import foodRouter from "./routes/foodRoutes.js"

dotenv.config()
connectDB()

const port = 3000
const app = express()
app.use(express.json())
app.use(cors())

// test api
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server working perfectly"
    })
})

// user api
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/food",foodRouter)


app.listen(port,()=>{
    console.log(`Server running on port: ${port} `)
})