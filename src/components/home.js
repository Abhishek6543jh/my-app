import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    // Fetch books from Firestore
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      
      <h1 className="text-3xl font-semibold mb-4">Book Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Publisher: {book.publisher}</p>
            <p className="text-gray-600">Published Date: {book.publishedDate}</p>
            {book.imageUrl && (
              <img src={book.imageUrl} alt={book.title} className="mt-2 rounded-md" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
