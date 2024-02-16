import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectdb = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("Missing MongoDB URI! Please set it in .env.");
        };

        await mongoose.connect(MONGO_URI);
        console.log("Connected to mongodb!");
        
    } catch (error) {
        console.error(error);
    }
}