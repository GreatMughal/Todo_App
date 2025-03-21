import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import validator from "validator"



export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking if user provided or not

        if (!name) {
            return res.json({
                success: false,
                message: "Please provide all fields."
            })
        };
        if (!email) {
            return res.json({
                success: false,
                message: "Please provide all fields."
            })
        };
        if (!password) {
            return res.json({
                success: false,
                message: "Please provide all fields."
            })
        };

        // checking user alredy exist 
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({
                success: false,
                message: "User already exist."
            })
        };

        // validating email and password

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter valid email aaddress."
            })
        };

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter strong password."
            })
        };

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            message: "User Register Successfully",
            token,
            userId: user._id
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "ERROR WHILE REGISTERING USER",
            errorMessage: error.message,
        })

    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            })
        }

        if (!password || !user.password) {
            return res.json({
                success: false,
                message: "MISSING PASSWORD OR HASHED PASSWORD"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success: true,
                message: "Invalid credentials."
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({
            success: true,
            message: "User login successfully.",
            token,
            userId: user._id
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "ERROR WHILE LOGIN USER",
            errorMessage: error.message,
        })
    }
} 