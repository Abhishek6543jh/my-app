// Navbar.js

import React, { useState, useEffect } from "react";
import Logout from "./signOut";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { FaSignOutAlt, FaUpload } from "react-icons/fa"; // Import icons as needed
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <Link to="/" className="font-semibold text-xl tracking-tight">
            Book Exchange
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/" className="text-white hover:text-gray-200">
            About
          </Link>
          <Link to="/" className="text-white hover:text-gray-200">
            Help
          </Link>
          {user && (
            <>
              <Link to="/my-uploaded-books" className="text-white hover:text-gray-200">
                Uploaded Books
              </Link>
              <Link to="/upload" className="text-white hover:text-gray-200">
                Upload
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center">
              <img
                src={auth?.currentUser?.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{user.displayName}</span>
              <button
                onClick={() => Logout()}
                className="text-white hover:text-gray-200"
              >
                <FaSignOutAlt className="inline-block ml-3" />
              </button>
              
            </div>
          ) : (
            <button
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
              onClick={handleLogin}
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
