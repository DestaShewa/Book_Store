# Full-Stack Bookstore Web Application

This repository contains the complete source code for a full-stack bookstore web application built as a learning project to demonstrate modern web development technologies.  
Admins can upload book details, cover images, and PDF files. Users can browse, search, view details, and download books.

![Bookstore Home Page](https://i.imgur.com/your-screenshot-url.png)  
*Replace the above image URL with a real screenshot of your app for better presentation.*

## Table of Contents

- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [What I Learned](#what-i-learned)  
- [Future Improvements](#future-improvements)

## Features

- **User Authentication:** Secure admin registration and login with JWT (JSON Web Tokens).  
- **Book Listings:** Display all available books fetched from the database.  
- **Book Detail Pages:** Each book has a detailed page with description and download links.  
- **Dynamic Categories:** View books filtered by category.  
- **Admin Book Upload:** Secure admin-only page for uploading books, cover images, and PDF files.  
- **File Handling:** Uses `multer` middleware to handle file uploads on the backend.  
- **Title Search:** Search bar on the homepage to filter books by title dynamically.  
- **Optimized Images:** Next.js `<Image>` component ensures automatic image optimization for faster loading.
