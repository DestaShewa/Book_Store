import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import the reusable components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full-Stack Bookstore",
  description: "A project built with Next.js and Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 
        These classes are added to make the footer sticky.
        flex/flex-col: Makes the body a flex container that stacks items vertically.
        min-h-screen: Ensures the body takes up at least the full height of the viewport.
      */}
      <body className={inter.className + " flex flex-col min-h-screen"}>
        {/* The Navbar appears at the top of every page */}
        <Navbar />

        {/* 
          The <main> tag holds the primary content of each page.
          container/mx-auto: Centers the content with a max-width.
          p-4: Adds padding around the content.
          flex-grow: Tells this element to take up any available extra space, pushing the footer down.
        */}
        <main className="container mx-auto p-4 flex-grow">{children}</main>

        {/* The Footer appears at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}
