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