// 1. IMPORT PACKAGES
const express = require('express');
const cors = require('cors');

// Import our new route files
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

// 2. INITIALIZE APP
const app = express();

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// --- THIS IS THE NEW LINE ---
// Make the 'public' folder accessible for serving static files like images
app.use(express.static('public')); 
// ----------------------------

// 4. CONNECT ROUTES
// Tell the app that any URL starting with '/api/books' should be handled by 'bookRoutes'.
app.use('/api/books', bookRoutes);

// Any URL starting with '/api/users' should be handled by 'userRoutes'.
app.use('/api/users', userRoutes);


// 5. START SERVER
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});