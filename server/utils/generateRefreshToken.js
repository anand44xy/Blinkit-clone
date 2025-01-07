import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";

const generateRefreshToken = async (userId) => {
    const token = jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN, 
        { expiresIn: '7d' }
    );

    await UserModel.updateOne(
        { _id: userId },
        { refresh_token: token }
    );

    return token;
};

export default generateRefreshToken;
