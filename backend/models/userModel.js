import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cart: {
        type: Map,
        of: {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'food' },
            quantity: { type: Number, default: 1 }
        },
        default: {}
    }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
