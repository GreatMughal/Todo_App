import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todoContoller.js";
import authUser from "../middlewares/auth.js";

const todoRouter = Router()

todoRouter.get("/all-todos", authUser, getAllTodos);
todoRouter.post("/create-todo", authUser, createTodo);
todoRouter.delete("/delete-todo", authUser, deleteTodo);
todoRouter.put("/update-todo", authUser, updateTodo)


export default todoRouter