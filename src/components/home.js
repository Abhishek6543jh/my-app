// Assuming your original Home.js file is located at '../components/Home.js'
import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-semibold mb-4">Books</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display Books or No Results Message */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              data-testid={`${book.id}`}
              className="block max-w-sm p-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight">
                {book.title}
              </h5>
              <p className="font-normal">{`Author: ${book.author}`}</p>
              <p className="font-normal">{`Publisher: ${book.publisher}`}</p>
              <p className="font-normal">{`Published Date: ${book.publishedDate}`}</p>
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="mt-4 rounded-md shadow-md"
                />
              )}
              <p className="font-normal">{`Uploaded by: ${book.displayName}`}</p>
              {book.userPic && (
                <img
                  src={book.userPic}
                  alt={book.displayName}
                  className="mt-4 rounded-md shadow-md"
                />
              )}
            
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No results found</p>
      )}
    </div>
  );
}

export default Home;
