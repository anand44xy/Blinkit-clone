import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI in the .env file");
}

async function connectDB() {
    try {
        mongoose.set('debug', true); // Optional for debugging queries
        await mongoose.connect(process.env.MONGODB_URI, {
            // ssl: false, // Set to true if SSL/TLS is required
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error details:', error.message, error.stack);
        process.exit(1); // Exit the process if connection fails
    }
}

export default connectDB;
