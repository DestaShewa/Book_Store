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


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (includes npm)  
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)  
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) or any MySQL GUI

### Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/bookstore-project.git
cd bookstore-project

cd server
npm install
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=bookstore_db
JWT_SECRET=your_super_secret_jwt_key


Set up the Database:

Open MySQL Workbench, connect to your server, and create a database/schema named bookstore_db.

Run these SQL commands to create tables


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    file_url VARCHAR(255),
    cover_image_url VARCHAR(255)
);
Set up the Frontend:
cd ../client
npm install

---

### Part 3 — Usage, API, Learning & Future Plans

```markdown
## Usage

You need to start both backend and frontend servers in separate terminal windows:

1. **Start Backend:**

```bash
cd server
npm start
Backend will run at http://localhost:5000.

Start Frontend:
cd client
npm run dev
Frontend will run at http://localhost:3000.

Open http://localhost:3000 in your browser. First, register an admin at http://localhost:3000/register.

API Endpoints
POST /api/users/register: Register a new admin user.

POST /api/users/login: Admin login, returns JWT token.

GET /api/books: Fetch all books.

POST /api/books: Upload a new book (admin only).

GET /api/books/search?title=:term: Search books by title.

GET /api/books/:id: Get details of a specific book.

GET /api/books/category/:name: Fetch books by category.

What I Learned
Designing full-stack project structure with clear separation.

Building REST APIs with Node.js and Express.

Integrating MySQL database operations in Node.js.

Implementing secure JWT authentication and password hashing.

Handling file uploads with multer.

Creating dynamic pages using Next.js App Router.

Using TypeScript to add type safety in both frontend and backend.

Styling UI efficiently with Tailwind CSS.

Connecting frontend and backend seamlessly with fetch API.

Future Improvements
Admin Dashboard: UI for admins to edit/delete books.

Pagination: Efficient book listing for large datasets.

User Reviews: Let logged-in users leave ratings and comments.

Deployment: Frontend on Vercel; backend & DB on Render, Railway, or similar.

Protected Routes: Middleware to restrict admin pages to authenticated users only.
