import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, foldername) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: foldername,
    });

    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
    }
    return response;
  } catch (error) {
    console.error("cloudnary Error:", error.message);
    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath)
    }
    return null;
  }
};

export { uploadOnCloudinary };
