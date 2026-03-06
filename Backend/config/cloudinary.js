import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME && !process.env.CLOUDINARY_NAME) {
    console.error('❌ CLOUDINARY_CLOUD_NAME is not set in environment variables');
}
if (!process.env.CLOUDINARY_API_KEY) {
    console.error('❌ CLOUDINARY_API_KEY is not set in environment variables');
}
if (!process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ CLOUDINARY_API_SECRET is not set in environment variables');
}

if (process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME) {
    console.log('✅ Cloudinary configured successfully');
}

const uploadFileToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new Error("No file or file buffer provided"));
        }
        
        const options = {
            resource_type: "auto",
            folder: "careerview", // Organize uploads in a folder
        };
        
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                console.error("❌ Cloudinary upload error:", error.message);
                return reject(error);
            }
            console.log("✅ File uploaded to Cloudinary:", result.secure_url);
            resolve(result);
        }).end(file.buffer);
    });
};

const multerMiddleware = multer({ storage: multer.memoryStorage() });

export { multerMiddleware, uploadFileToCloudinary };
