import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
        trim : true
    },
    image : {
        type : String,
        default : ""
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Category"
        }
    ]
}, {
    timestamps : true
})

const SubeCategoryModel = mongoose.model('Subcategory', subCategorySchema)
export default SubeCategoryModel
