const express = require("express");
const multer = require("multer");
const path = require("path"); // Node.js 'path' module

const router = express.Router();

// Configure where to store the file and what to name it
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // The destination is the 'uploads' folder inside our 'public' folder
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    // We create a unique filename to prevent overwriting files
    // Filename = originalname + current timestamp + original extension
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create the API endpoint: POST /api/upload
// The 'upload.single('file')' middleware will process a single file upload
// from a form field named 'file'.
router.post("/", upload.single("file"), (req, res) => {
  // If the file is uploaded successfully, req.file will contain file details
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // We send back a response with the path to the uploaded file
  res.status(200).json({
    message: "File uploaded successfully!",
    // The path will be something like 'uploads/file-1678886400000.jpg'
    filePath: `uploads/${req.file.filename}`,
  });
});

module.exports = router;
