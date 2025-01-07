import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
        trim : true
    },
    image : {
        type : String,
        default : ""
    },
},{
    timestamps : true
})

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel