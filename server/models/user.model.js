import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        avatar: {
            type: String,
            default: "",
        },
        mobile: {
            type: String,
            default: null,
            match: [/^\d{10}$/, "Mobile number must be 10 digits"],
        },
        refresh_token: {
            type: String,
            default: "",
        },
        verify_email: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Suspended"],
            default: "Active",
        },
        address_details: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        ],
        shopping_cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CartProduct",
            },
        ],
        orderHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        forgot_password_otp: {
            type: String,
            default: null,
        },
        forgot_password_expiry: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
