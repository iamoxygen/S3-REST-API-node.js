const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file?.originalname.replace(/\s+/g, "")); // Unique file name
  },
});

// Multer file upload instance
const upload = multer({ storage: storage });

module.exports = upload;
