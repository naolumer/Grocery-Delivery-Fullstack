import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:[String], required:true},
    category: {type:String, required:true},
    price:{type:Number, required:true},
    offerPrice:{type:Number, required:true},
    inStock: {type:Boolean,default:true}, 
    description: {type:String, required:true}
},{timestamps:true})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel