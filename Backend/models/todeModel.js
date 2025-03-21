import mongoose from "mongoose";

const todoScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const todoModel = mongoose.models.Todo || mongoose.model("Todo", todoScheme)

export default todoModel