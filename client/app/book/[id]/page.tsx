"use client"; // This tells Next.js it's an interactive Client Component

import { useState, useEffect } from "react";

// Define the shape of our Book data using a TypeScript interface
interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  file_url: string; // The URL to the PDF file
  cover_image_url: string; // The URL to the cover image
}

// This is our page component. It receives `params` as a prop from Next.js.
// The `params` object contains the dynamic parts of the URL, in this case, the `id`.
export default function BookDetailPage({ params }: { params: { id: string } }) {
  // State to hold the book data once we fetch it. Starts as 'null'.
  const [book, setBook] = useState<Book | null>(null);

  // State to hold any error messages. Starts as an empty string.
  const [error, setError] = useState("");

  // State to track if the page is currently loading data.
  const [isLoading, setIsLoading] = useState(true);

  // The useEffect hook is perfect for fetching data when the component loads.
  useEffect(() => {
    // We define an async function inside the hook to fetch the data.
    const fetchBookDetails = async () => {
      try {
        // Use the 'id' from the params to build the correct API URL.
        const response = await fetch(
          `http://localhost:5000/api/books/${params.id}`
        );

        if (!response.ok) {
          // If the server responds with an error (like 404), we handle it.
          throw new Error("Book not found or server error.");
        }

        const data = await response.json();
        setBook(data); // Put the fetched book data into our state.
      } catch (err) {
        // If the fetch itself fails (e.g., network error), we handle it.
        setError("Failed to fetch book details. Please try again.");
      } finally {
        // This 'finally' block runs whether the fetch succeeded or failed.
        // It's the perfect place to turn off the loading indicator.
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [params.id]); // The dependency array: This tells React to re-run the effect ONLY if `params.id` changes.

  // --- Render logic based on the state ---

  // 1. If we are still loading, show a simple loading message.
  if (isLoading) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  // 2. If an error occurred, show the error message.
  if (error) {
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;
  }

  // 3. If loading is done and there's no book, show a not found message.
  if (!book) {
    return (
      <p className="text-center text-lg mt-10">Book could not be found.</p>
    );
  }

  // 4. If everything is successful, display the book details.
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={book.cover_image_url}
            alt={`Cover of ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-2xl text-gray-600 mb-4">by {book.author}</h2>
          <p className="text-lg bg-gray-100 inline-block px-3 py-1 rounded-full mb-6">
            {book.category}
          </p>
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-700 mb-8">{book.description}</p>
          <div className="flex items-center gap-4">
            <a
              href={book.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Read Online (View PDF)
            </a>
            <a
              href={book.file_url}
              download
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              Download File
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
