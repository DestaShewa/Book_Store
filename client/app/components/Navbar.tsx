import Link from "next/link"; // Import the Link component for client-side navigation

// This is our Navbar component
export default function Navbar() {
  return (
    // <nav> is a semantic HTML tag for navigation sections
    // The classes make it a dark bar with padding and flexbox for alignment
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Site Title */}
        <Link href="/" className="text-2xl font-bold">
          Bookstore
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="hover:text-slate-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-slate-300">
            About
          </Link>

          {/* This link will be for admins only */}
          <Link
            href="/upload"
            className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Upload Book
          </Link>
        </div>
      </div>
    </nav>
  );
}
