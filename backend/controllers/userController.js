import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"
import validator from "validator"


export const registerUser = async (req,res)=>{
    
    const {name,email,password} = req.body

    if (!name || !email || !password){
        return res.json({
            success:false,
            message:"Missing details"
        })
    }
    try {
        const userExists = await userModel.findOne({email})

        if (userExists){
            return res.json({
                success:false,
                message:"User Already exists!"
            })
        }
        if (!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Enter a valid email address"
            })
        }
        if (password.length < 8){
            return res.json({
                success:false,
                message:"Password must be atleast 8 characters"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = userModel({
            name,
            email,
            password:hashedPassword
        })
        await newUser.save()

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{ expiresIn: '1d' })

        return res.json({
            success:true,
            message:"Registration successful",
            token
        })

    } catch(error){
        res.json({success:false, message:error.message})
    }
}


// Login api
export const loginController = async (req,res)=>{
    
    const {email,password} = req.body

    if (!email || !password){
        return res.json({
            success:false,
            message:"Please enter email and password"
        })
    }
    try {
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({
                success:false,
                message:"Invalid Email"
            })
        }
        
        const userMatches = await bcrypt.compare(password,user.password)
        
        if (!userMatches){
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1d' } )

        res.json({
            success:true,
            message:"Login successful",
            token
        })

    } catch(error){
        res.json({success:false, message:error.message})
    } 
}