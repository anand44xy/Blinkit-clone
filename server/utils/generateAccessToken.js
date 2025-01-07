import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
    const token = jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN, 
        { expiresIn: '1h' }
    );
    return token;
};

export default generateAccessToken;
