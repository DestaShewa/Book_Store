"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Spiritual");
  const [description, setDescription] = useState("");

  // State for each file
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverImage || !bookFile) {
      setError("Please select both a cover image and a book file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("coverImage", coverImage); // Append the cover image
    formData.append("bookFile", bookFile); // Append the book PDF

    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Book uploaded successfully! Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (err) {
      setError("An error occurred while uploading. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="p-8 border rounded-lg shadow-lg w-full max-w-2xl bg-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Upload a New Book
        </h1>

        {/* Text and select fields remain the same */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white"
          >
            <option>Spiritual</option>
            <option>Self-development</option>
            <option>Business</option>
            <option>Science</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={4}
            required
          />
        </div>

        {/* --- NEW FILE INPUTS --- */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">
            Cover Image (JPEG, PNG)
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) =>
              setCoverImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Book File (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setBookFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
        >
          Upload Book
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4 text-center">{success}</p>
        )}
      </form>
    </div>
  );
}
