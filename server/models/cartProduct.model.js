import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true 
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1 
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true 
    }
}, {
    timestamps: true
});

// Prevent duplicate cart entries for the same product and user
cartProductSchema.index({ productId: 1, userId: 1 }, { unique: true });

const CartProductModel = mongoose.model('CartProduct', cartProductSchema);
export default CartProductModel;
