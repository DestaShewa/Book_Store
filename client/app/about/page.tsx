export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        About Bookstore To Me
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Our Mission
        </h2>
        <p className="text-slate-700 mb-6">
          Bookstore To Me is designed to bring readers a wide variety of books
          across different interests and passions. Whether you’re seeking
          spiritual wisdom, exploring scientific discoveries, improving yourself
          through self-development, or diving into business strategies, our goal
          is to create a platform where every reader can find their next
          favorite read in one place.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Book Categories
        </h2>
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          <li>
            <strong>Spiritual:</strong> Books that inspire inner growth and
            mindfulness.
          </li>
          <li>
            <strong>Science:</strong> Knowledge-driven books exploring the
            wonders of the world and beyond.
          </li>
          <li>
            <strong>Self-Development:</strong> Resources to help you become the
            best version of yourself.
          </li>
          <li>
            <strong>Business:</strong> Strategies, case studies, and insights
            for aspiring and seasoned entrepreneurs.
          </li>
        </ul>
      </div>
    </div>
  );
}
