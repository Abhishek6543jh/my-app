// Home.js

import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

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
    <div className="bg-gray-300 text-gray-800 p-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Explore Books</h1>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="p-2 border rounded-md w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
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
              className="relative overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              {/* Book Image */}
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-t-lg transition duration-300 ease-in-out transform scale-100 hover:scale-110 blend-multiply"
                />
              )}

              {/* Book Uploader's Profile Picture and Name */}
              <div className="absolute top-0 left-0 right-0 flex items-center p-4">
                <img
                  src={book.userPic}
                  alt={book.displayName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <h5 className="text-base text-gray-200 sm:text-lg font-bold tracking-tight">{book.displayName}</h5>
              </div>

              <div className="p-4">
                {/* Book Title */}
                <h5 className="text-lg sm:text-xl font-bold mb-2">{book.title}</h5>

                {/* Book Details */}
                <p className="text-sm sm:text-base font-normal mb-2">{`Author: ${book.author}`}</p>
                <p className="text-sm sm:text-base font-normal mb-2">{`Publisher: ${book.publisher}`}</p>
                <p className="text-sm sm:text-base font-normal mb-2">{`Published Date: ${book.publishedDate}`}</p>

                {/* Start Chat Link */}
                <Link
                  to={`/book-chat/${book.id}`} // Use book id in the link
                  className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block hover:bg-blue-600"
                >
                  Chat
                </Link>
              </div>
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
