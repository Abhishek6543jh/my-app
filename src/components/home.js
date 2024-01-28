// Home.js

import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon from FontAwesome

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
    <div className="ml-10 mt-4 ">
    <div>
      {/* Stylish Search Bar with Search Icon */}
      <div className="mb-8 ml-40 mr-80 relative">
        <input
          type="text"
          placeholder="Search books..."
          className="p-3 pl-10 border rounded-md w-full text-gray-800 focus:outline-none focus:ring focus:border-blue-300 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute top-4 left-4 text-gray-500" />
      </div>
   
      {/* Display Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book relative overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col">
            {/* Book Image inside cover class */}
            <div className="cover relative overflow-hidden flex-shrink-0">
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out transform scale-100 hover:scale-110 blend-multiply"
                />
              )}
            </div>

            <div className="p-4 flex flex-col justify-between h-full">
              {/* Book Details (Inside book class) */}
              <div className="flex flex-col items-center mb-4">
                <p className="text-base  sm:text-lg font-bold tracking-tight">{book.displayName}</p>
                <img
                  src={book.userPic}
                  alt={`${book.displayName}'s profile`}
                  className="w-10 h-10 rounded-full my-2"
                />
                <h5 className="text-lg sm:text-xl font-bold mb-8 ml-10">{book.title}</h5>
                <p className="text-sm sm:text-base font-normal mb-2">{`Author: ${book.author}`}</p>
                <p className="text-sm sm:text-base font-normal mb-2">{`Publisher: ${book.publisher}`}</p>
                <p className="text-sm sm:text-base font-normal mb-2">{`Published Date: ${book.publishedDate}`}</p>
              </div>
              
              {/* Chat Button */}
              <div className="text-center">
                <Link
                  to={`/book-chat/${book.id}`} // Use book id in the link
                  className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block hover:bg-blue-600"
                >
                  Chat
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
