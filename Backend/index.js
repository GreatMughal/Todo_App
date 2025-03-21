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
const allowedOrigins = [""]
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get("/", (req, res) => {
    res.send("Api Working");
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter)

app.listen(port, () => {
    console.log("Server is running on http://localhost:3000");

})
