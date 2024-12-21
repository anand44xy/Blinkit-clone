import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';


export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        // Validate request body
        if (!name || !email || !password) {
            return response.status(400).json({
                message: 'Please fill all required fields.',
                error: true,
                success: false
            });
        }

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return response.status(409).json({ // Use proper status code for conflict
                message: "Email is already registered.",
                error: true,
                success: false
            });
        }

        // Hash the user's password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // Prepare payload for the new user
        const payload = {
            name,
            email,
            password: hashPassword
        };

        // Save user in the database
        const save = await UserModel.create(payload);

        // Generate email verification URL
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

        // Send verification email
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify your email with Blinkit",
            html: verifyEmailTemplate(name, verifyEmailUrl)
        });

        if (!verifyEmail) {
            return response.status(500).json({
                message: 'Failed to send verification email.',
                error: true,
                success: false
            });
        }

        // Respond with success
        return response.status(201).json({
            message: "User registered successfully. Please verify your email.",
            error: false,
            success: true,
            data: save
        });

    } catch (error) {
        // Handle unexpected errors
        return response.status(500).json({
            message: error.message || 'An unexpected error occurred.',
            error: true,
            success: false,
        });
    }
}


export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body
        const user = await UserModel.findOne({ _id: code })
        if (!user) {
            return response.status(400).json({
                message : "Invalide code",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code}, {
            verify_email : true
        })

        return response.json({
            message : "Email verification successfullly.",
            error : true,
            success : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Login controller
export async function loginController(request, response) {
    try {
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true, 
            success : false
        })
    }
}
