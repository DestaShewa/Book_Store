const express = require("express");
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// --- Route 1: Register a New User ---
// This route handles creating a new user with a securely hashed password.
router.post("/register", (req, res) => {
  // First, we check if a user with this email already exists to avoid duplicates.
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkEmailSql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }
    if (data.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // If the email is new, we proceed.
    // We use bcrypt to scramble the password into a secure hash.
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: "Error during salt generation" });
      }

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error during password hashing" });
        }

        // Now, we store the user's info with the HASHED password, not the original.
        const insertUserSql =
          "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
        const values = [
          req.body.name,
          req.body.email,
          hashedPassword, // Storing the secure password
        ];

        db.query(insertUserSql, [values], (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Failed to register user in database" });
          }
          return res
            .status(201)
            .json({ message: "User registered successfully!" });
        });
      });
    });
  });
});

// --- Route 2: Login an Existing User ---
// This route handles logging in a user and giving them a token.
router.post("/login", (req, res) => {
  // First, we find the user by the email they provided.
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }
    if (data.length === 0) {
      // If we don't find a user, we send a generic error.
      return res.status(404).json({ error: "Invalid email or password." });
    }

    const user = data[0]; // The user's data from the database.

    // Next, we securely compare the password they submitted with the hashed password in our database.
    const passwordIsCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsCorrect) {
      // If the passwords do NOT match, send the same generic error.
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // If the password IS correct, we create a JSON Web Token (JWT).
    // This token acts as a temporary "keycard" for the user.
    const token = jwt.sign(
      { id: user.id, name: user.name }, // The data we want to store inside the token
      process.env.JWT_SECRET, // The secret key to sign the token
      { expiresIn: "1h" } // An option to make the token expire in 1 hour
    );

    // Finally, we send a success message and the token back to the frontend.
    return res.json({
      message: "Login successful!",
      token: token,
    });
  });
});

// This line makes the router and all its routes available to the rest of our app.
module.exports = router;
