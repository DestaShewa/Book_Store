"use client"; // This is a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // State variables to hold the form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To hold any error messages
  const [success, setSuccess] = useState(""); // To hold the success message

  const router = useRouter(); // To redirect the user after registration

  // This function is called when the user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Clear previous messages
    setError("");
    setSuccess("");

    // Send the form data to our backend API
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // If registration was successful
      setSuccess("Registration successful! Redirecting to login...");
      // Wait 2 seconds and then redirect to the login page
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      // If there was an error
      setError(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 border rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        {/* Add this block after the button */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>

        {/* Display error or success messages */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4 text-center">{success}</p>
        )}
      </form>
    </div>
  );
}
