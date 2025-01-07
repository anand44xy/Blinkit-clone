import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,   
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});


const uploadImageCloudinary = async (Image) => {
    try {
        if (!Image) {
            throw new Error("No image provided for upload."); 
        }

        // Convert the image to a buffer for upload
        const buffer = Image?.buffer || Buffer.from(await Image.arrayBuffer());
        
        // Upload the image to Cloudinary
        const uploadImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "blinkit" }, 
                (error, uploadResult) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error); 
                        reject(new Error("Failed to upload image to Cloudinary."));
                    } else {
                        resolve(uploadResult); // Return the upload result
                    }
                }
            ).end(buffer); // Stream the buffer data
        });

        return uploadImage;
    } catch (error) {
        console.error("Error in uploadImageCloudinary:", error.message); 
        throw error; 
    }
};

export default uploadImageCloudinary;
