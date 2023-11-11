import cloudinaryPackage from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from 'dotenv'
dotenv.config();

const cloudinary=cloudinaryPackage.v2;

// configuring env for cloudinary...
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const storage=new CloudinaryStorage({
    cloudinary,
    allowedFormats:["jpg","png","jpeg"],
    params:{
        folder:"Ecommerce-api",
    },
});

const upload =multer({
    storage
});
export default upload;