import foodModel from "../models/foodModel.js"


// food list for admin
export const foodListAdmin = async (req, res)=>{
    try{
        const food = await foodModel.find({})

        if (!food){
            return res.json({
                success:false,
                message:"No food found"
            })
        }

        return res.json({
            success:true,
            food
        })

    } catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }
}

// food list for frontend

export const getAllProducts = async (req, res)=>{
    
    try{
        const food = await foodModel.find({})

        if (!food){
            return res.json({
                success:false,
                message:"No food found"
            })
        }

        return res.json({
            success:true,
            food
        })

    } catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }
}

// inStock controller

export const inStockController =  async (req,res)=>{
    
    const {foodId} = req.body
    
    if (!foodId){
        return res.json({
            success:false,
            message: "Provide Id"
        })
    }

    try {
        const food = await foodModel.findById(foodId)

        if (!food){
            return res.json({
                success:false,
                message: "Food not found"
            })
        }

        food.inStock = !food.inStock
        await food.save()

        return res.json({
            success:true,
            message:"updated instock"
        })

    } catch(error){
        return res.json({
            success:false,
            message: error.message
        })
    }
}