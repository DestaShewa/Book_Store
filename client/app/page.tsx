"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // <-- 1. IMPORT LINK

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  file_url: string;
  cover_image_url: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const fetchAllBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Could not load books. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchAllBooks();
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/books/search?title=${searchQuery}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Search failed. Please try again.");
    }
  };

  return (
    <div>
      {/* ... (Welcome and Search sections remain the same) ... */}
      <div className="text-center py-10 bg-slate-50 rounded-lg mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-slate-800">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore our curated collection of books across various genres. Find
          your passion, develop your skills, and expand your mind.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a book by title..."
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {books.length > 0 ? (
          books.map((book) => (
            // --- 2. WRAP THE ENTIRE BOOK CARD IN A LINK ---
            <Link href={`/book/${book.id}`} key={book.id}>
              <div className="border p-4 rounded-lg shadow-md bg-white h-full hover:shadow-xl hover:-translate-y-1 transition-all">
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm mt-2 bg-gray-100 inline-block px-2 py-1 rounded">
                  {book.category}
                </p>
              </div>
            </Link>
            // ---------------------------------------------
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No books found. Try a different search. and comming soon with more
            books
          </p>
        )}
      </div>
    </div>
  );
}
