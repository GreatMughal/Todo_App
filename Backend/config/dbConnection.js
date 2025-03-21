import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONODB_URI}`);
        console.log("DB CONNECTED SUCCESSFULLY.");

    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}

export default dbConnection