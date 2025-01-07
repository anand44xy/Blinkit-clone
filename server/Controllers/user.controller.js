import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generateOTP from '../utils/generateOTP.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import sendEmail from '../config/sendEmail.js';

// 1. Register user controller
export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: 'Please fill all required fields.',
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return response.status(409).json({
                message: 'Email is already registered.',
                error: true,
                success: false,
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashPassword,
            verify_email: false,
        });

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`;

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: 'Verify your email with Blinkit',
            html: verifyEmailTemplate(name, verifyEmailUrl),
        });

        if (!verifyEmail) {
            return response.status(500).json({
                message: 'Failed to send verification email.',
                error: true,
                success: false,
            });
        }

        return response.status(201).json({
            message: 'User registered successfully. Please verify your email.',
            error: false,
            success: true,
            data: newUser,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || 'An unexpected error occurred.',
            error: true,
            success: false,
        });
    }
}

// 2. Email verification controller
export async function verifyEmailController(request, response) {
    try {
        const { code } = request.query;

        const user = await UserModel.findById(code);
        if (!user) {
            return response.status(400).json({
                message: 'Invalid code',
                error: true,
                success: false,
            });
        }

        user.verify_email = true;
        await user.save();

        return response.json({
            message: 'Email verified successfully.',
            error: false,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || 'An unexpected error occurred.',
            error: true,
            success: false,
        });
    }
}

// 3. Login controller
export async function loginController(request, response) {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(404).json({
                message: 'Email is not registered.',
                error: true,
                success: false,
            });
        }

        if (!user.verify_email) {
            return response.status(403).json({
                message: 'Please verify your email.',
                error: true,
                success: false,
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({
                message: 'Invalid credentials.',
                error: true,
                success: false,
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        return response.status(200).json({
            message: 'Login successful.',
            error: false,
            success: true,
            data: { accessToken, refreshToken },
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || 'An unexpected error occurred.',
            error: true,
            success: false,
        });
    }
}

// 4. Logout controller
export async function logoutController(request, response) {
    try {
        // Check if tokens are present
        const refreshToken = request.cookies.refreshToken;
        const accessToken = request.cookies.accessToken;

        if (!refreshToken && !accessToken) {
            return response.status(400).json({
                message: "Provide token",
                error: true,
                success: false,
            });
        }

        // Clear cookies
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0),
        };
        response.clearCookie("accessToken", cookiesOption);
        response.clearCookie("refreshToken", cookiesOption);

        return response.status(200).json({
            message: "Logout successful.",
            error: false,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || "An unexpected error occurred during logout.",
            error: true,
            success: false,
        });
    }
}


// 5. Upload user 'Avatar'
export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId // from auth middlware
        const image = request.file // from multer middlware

        const upload = await uploadImageCloudinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })
        return response.json({
            message: "Profile avatar uploaded successfully.",
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || "An unexpected error occurred during logout.",
            error: true,
            success: false
        });
    }
}

// 6. Udate user details
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId // from auth middleware
        const { name, email, mobile, password } = request.body

        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword }),
        })

        return response.status(200).json({
            message: "User details updated successfully.",
            error: false,
            success: true,
            data: updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || "An unexpected error occured during updating user details.",
            error: true,
            success: false
        })
    }
}

// 7. Forgot password not login 
export async function forgotPasswordController(request, response) {``
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).json({ message: "Email is required", error: true });
        }

        let user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: "User not found", error: true });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // Set expiry to 10 minutes

        user.forgot_password_otp = otp;
        user.forgot_password_expiry = expiry;
        await user.save();

        await sendEmail({
            sendTo: email,
            subject: "Forgot password form blinkit",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })

        return response.json({
            message: "Check your email",
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return response.status(500).json({ message: "Internal Server Error", error: true });
    }
}

// 8. Verify forgot password otp
export const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required", error: true });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", error: true });
        }

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", error: true });
        }

        const otpExpiry = new Date(user.forgot_password_expiry);
        if (otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP has expired", error: true });
        }

        return res.status(200).json({ message: "OTP verified successfully", success: true });
    } catch (error) {
        console.error("Error in verifyForgotPasswordOtp:", error);
        return res.status(500).json({ message: "Internal Server Error", error: true });
    }
};


// 9. Reset Password 
export async function resetPassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body

        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: 'Please fill all required fields.',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email })

        // If user not available
        if (!user) {
            return response.status(400).json({
                message: 'Email not available',
                error: true,
                success: false
            });
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: 'Password not match!',
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const updateNewPassword = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword
        })

        return response.json({
            message: "Password updated successfully.",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// 10. Refresh token controller
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split()[1] // [Bearer token]

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return response.status(401).json({
                message: "token is expired",
                error: true,
                success: flase
            })
        }

        console.log("verifyToken", verifyToken)
        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken()

        // Set cookies for tokens
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', newAccessToken, cookiesOption)

        return response.json({
            message: "New access token generated",
            error: false,
            success: true,
            data: { accessToken: newAccessToken }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}