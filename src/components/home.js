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
    <div className="bg-white-900 text-black p-8">
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
              className="block max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              {/* Book Uploader's Profile Picture and Name */}
              <div className="flex items-center mb-4">
                <img
                  src={book.userPic}
                  alt={book.displayName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <h5 className="text-lg font-bold tracking-tight">{book.displayName}</h5>
              </div>

              {/* Book Title */}
              <h5 className="text-xl font-bold mb-2">{book.title}</h5>

              {/* Book Details */}
              <p className="font-normal">{`Author: ${book.author}`}</p>
              <p className="font-normal">{`Publisher: ${book.publisher}`}</p>
              <p className="font-normal">{`Published Date: ${book.publishedDate}`}</p>

              {/* Book Image */}
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
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
