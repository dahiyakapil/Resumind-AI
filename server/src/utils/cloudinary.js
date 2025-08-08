// import cloudinary from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// export const uploadToCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(filePath, {
//       resource_type: "auto",
//       type: "upload",
//     });

//     return result.secure_url;
//   } catch (error) {
//     throw new Error("Cloudinary upload failed: " + error.message);
//   }
// };



import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Upload a file to Cloudinary and return the secure URL.
 * Deletes the local file after upload (whether success or fail).
 */
export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: "raw", // ✅ FORCE it to raw for PDF
      use_filename: true,
      unique_filename: true,
      folder: "resumes",
    });
    console.log("Cloudinary Upload Result:", result);


    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  } finally {
    // ✅ Always clean up the local file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
