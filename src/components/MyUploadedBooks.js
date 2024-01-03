import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Import your authentication context

function MyUploadedBooks() {
  const auth = useAuth(); // Get the current user from your authentication context
  const [userUploadedBooks, setUserUploadedBooks] = useState([]);

  useEffect(() => {
    // Fetch books uploaded by the current user
    const fetchUserUploadedBooks = async () => {
      try {
        if (!auth.currentUser) {
          // Check if user is authenticated
          return;
        }

        const userBooksQuery = query(
          collection(db, 'books'),
          where('userId', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(userBooksQuery);
        const userBooksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserUploadedBooks(userBooksData);
      } catch (error) {
        console.error('Error fetching user uploaded books:', error.message);
      }
    };

    fetchUserUploadedBooks();
  }, [auth]);

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-semibold mb-4">My Uploaded Books</h1>

      {userUploadedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userUploadedBooks.map((book) => (
            <a
              key={book.id}
              href="#"
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
            </a>
          ))}
        </div>
      ) : (
        <p className="text-white">No uploaded books found</p>
      )}
    </div>
  );
}

export default MyUploadedBooks;
