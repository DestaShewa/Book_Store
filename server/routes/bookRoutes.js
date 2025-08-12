const express = require("express");
const db = require("../db");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    // We add the original fieldname (e.g., 'cover' or 'pdf') to the filename
    // Example: 'cover-1704081593815.jpg' or 'pdf-1704081593815.pdf'
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// --- API ROUTES for BOOKS ---

// 1. POST A NEW BOOK WITH **TWO** FILE UPLOADS
// We use upload.fields([...]) to specify the names of the two file inputs we expect.
router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFile", maxCount: 1 },
  ]),
  (req, res) => {
    // req.files (plural) will now be an object containing our files
    // e.g., { coverImage: [file1], bookFile: [file2] }
    const coverImage = req.files.coverImage[0];
    const bookFile = req.files.bookFile[0];

    // Build the URLs for both files
    const coverImageUrl = `http://localhost:5000/uploads/${coverImage.filename}`;
    const bookFileUrl = `http://localhost:5000/uploads/${bookFile.filename}`;

    const sql =
      "INSERT INTO books (`title`, `author`, `category`, `description`, `file_url`, `cover_image_url`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.author,
      req.body.category,
      req.body.description,
      bookFileUrl, // The URL for the PDF
      coverImageUrl, // The URL for the cover image
    ];

    db.query(sql, [values], (err, data) => {
      if (err) {
        console.error("Database error on book insert:", err);
        return res.status(500).json({ error: "Failed to upload book" });
      }
      return res.status(201).json({ message: "Book uploaded successfully!" });
    });
  }
);

// ... (keep all the other GET routes: '/', '/search', '/:id', '/category/:name' exactly as they were) ...
// (The GET routes below this point are unchanged)

router.get("/", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Server error" });
    return res.json(data);
  });
});

router.get("/search", (req, res) => {
  const searchTerm = req.query.title;
  const sql = "SELECT * FROM books WHERE title LIKE ?";
  const values = [`%${searchTerm}%`];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database search error:", err);
      return res.status(500).json({ error: "Failed to search for books" });
    }
    return res.json(data);
  });
});

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM books WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (data.length === 0)
      return res.status(404).json({ message: "Book not found" });
    return res.json(data[0]);
  });
});

router.get("/category/:name", (req, res) => {
  const sql = "SELECT * FROM books WHERE category = ?";
  const categoryName = req.params.name;
  db.query(sql, [categoryName], (err, data) => {
    if (err) return res.status(500).json({ error: "Server error" });
    return res.json(data);
  });
});

module.exports = router;
