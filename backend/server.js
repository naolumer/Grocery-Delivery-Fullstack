import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/userRoutes.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const port = process.env.PORT || 3000
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

app.use("/api/user",userRouter)


app.listen(port,()=>{
    console.log(`Server running on port: ${port} `)
})