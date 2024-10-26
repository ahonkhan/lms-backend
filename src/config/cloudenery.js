// cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;

// Load environment variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary.
 * @param {string} filePath - The path of the file to upload.
 * @param {object} options - Optional parameters for upload (e.g., folder, public_id).
 * @returns {Promise<object>} The result object containing file information, including `url` and `public_id`.
 */
const uploadFileToCloud = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

/**
 * Delete a file from Cloudinary.
 * @param {string} publicId - The `public_id` of the file to delete.
 * @returns {Promise<object>} The result object containing deletion status.
 */
const deleteFileFromCloud = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    throw error;
  }
};

module.exports = { uploadFileToCloud, deleteFileFromCloud };
