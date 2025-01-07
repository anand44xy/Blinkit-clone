import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const auth = async (request, response, next) => {
    try {
        const token = request.cookies.accessToken || request.headers.authorization?.split(' ')[1];

        if (!token) {
            return response.status(401).json({
                message: 'Unauthorized. No token provided.',
                error: true,
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        request.userId = decoded.id;
        next();
    } catch (error) {
        return response.status(500).json({
            message: error.message || 'Unauthorized access.',
            error: true,
            success: false,
        });
    }
};

export default auth