import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Import your authentication context
import { Link } from "react-router-dom";

function MyUploadedBooks() {
  const auth = useAuth();
  const [userUploadedBooks, setUserUploadedBooks] = useState([]);

  useEffect(() => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userUploadedBooks.map((book) => (
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
                {/* You can add your chat button or any other functionality here */}
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
  );
}

export default MyUploadedBooks;
