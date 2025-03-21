import todoModel from "../models/todeModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const createTodo = async (req, res) => {
    try {
        const { title, userId } = req.body;

        // 1. Create the todo
        const newTodo = new todoModel({
            title,
            user: userId
        });
        const savedTodo = await newTodo.save();

        // 2. Push the todo ID into the user's todos array
        await userModel.findByIdAndUpdate(userId, {
            $push: { todos: savedTodo._id }
        });

        res.status(201).json({
            success: true,
            message: "Todo created and added to user!",
            todo: savedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating todo"
        });
    }
};




export const updateTodo = async (req, res) => {
    try {
        const { id, title } = req.body;

        // Basic validation
        if (!id || !title) {
            return res.status(400).json({
                success: false,
                message: "Please provide both todo ID and updated title."
            });
        }

        // Optional: Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid todo ID format."
            });
        }

        // Find the todo by ID and update it
        const todo = await todoModel.findByIdAndUpdate(
            id,                      // Which todo to update
            { title },               // What to update
            { new: true }            // Return the updated document
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully.",
            todo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating todo."
        });
    }
};



export const getAllTodos = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

        // Optional: Validate the userId format (good for MongoDB)
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID."
            });
        }

        // Find todos by user ID
        const todos = await todoModel.find({ user: userId })
            .populate({
                path: 'user',
                select: 'name email'
            });

        if (todos.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No todos found for this user."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully.",
            todos
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user's todos."
        });
    }
};




export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Todo ID is required."
            });
        }

        // Optional but good: Validate Mongo ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID."
            });
        }

        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully.",
            deletedTodo
        });
    } catch (error) {
        console.error("Error deleting todo:", error);

        return res.status(500).json({
            success: false,
            message: "Error while deleting todo."
        });
    }
};


