import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        address_line: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        pincode: {
            type: String,
            match: [/^\d{6}$/, "Pincode must be a 6-digit number"], 
        },
        country: {
            type: String,
            default: "India",
            trim: true,
        },
        mobile: {
            type: String,
            match: [/^\d{10}$/, "Mobile number must be a valid 10-digit number"], 
        },
        status: {
            type : Boolean,
            default : true
        }
    },
    {
        timestamps: true, 
    }
);

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
