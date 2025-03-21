import express from "express"
import cors from "cors"
import "dotenv/config"
import userRouter from "./routes/userRoute.js";
import dbConnection from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import todoRouter from "./routes/todoRoute.js";

const app = express();
const port = process.env.PORT

dbConnection()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Api Working");
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter)

app.listen(port, () => {
    console.log("Server is running on http://localhost:3000");

})