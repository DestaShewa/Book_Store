interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
}

async function getBooksByCategory(category: string): Promise<Book[]> {
  const res = await fetch(
    `http://localhost:5000/api/books/category/${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { name: string };
}) {
  const books = await getBooksByCategory(params.name);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8 capitalize">
        Category: {params.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {books.length === 0 ? (
          <p className="col-span-full text-center">
            No books found in this category.
          </p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
