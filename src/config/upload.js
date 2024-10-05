const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const uploadFile = (fieldName, allowedExt) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = "uploads/"; // Specify your upload path
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${crypto
        .randomBytes(16)
        .toString("hex")}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExt.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed."), false);
    }
  };

  return multer({ storage: storage, fileFilter: fileFilter }).single(fieldName);
};

module.exports = uploadFile;
