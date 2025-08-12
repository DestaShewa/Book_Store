export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year automatically
  return (
    <footer className="bg-slate-800 text-white text-center p-4 mt-10">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Desta .S. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
