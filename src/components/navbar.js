import React, { useState, useEffect } from "react";
import Logout from "./signOut";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="bg-gray-800 bg-opacity-80 p-6">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <span className="font-semibold text-xl tracking-tight">
            Book Exchange
          </span>
        </div>
        <a
          href="/"
          className="text-white hover:text-white px-4 py-2"
        >
          Home
        </a>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fillRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="w-full hidden lg:flex lg:items-center lg:justify-end">
          {user ? (
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={toggleMenu}
                  className="flex items-center text-teal-200 hover:text-white focus:outline-none"
                >
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-white">{user.displayName}</span>
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L13.586 12H3a1 1 0 0 1 0-2h10.586L9.293 6.707a1 1 0 0 1 0-1.414z"
                    ></path>
                  </svg>
                </button>
              </div>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      onClick={() => {
                        Logout();
                        closeMenu();
                      }}
                      href="/"
                      className="block px-4 py-2 text-sm text-teal-700 hover:bg-teal-100"
                      role="menuitem"
                    >
                      Logout
                    </a>
                    <a
                      href="/upload"
                      className="block px-4 py-2 text-sm text-teal-700 hover:bg-teal-100"
                      role="menuitem"
                    >
                      Upload
                    </a>
                    <a
                      href="/my-uploaded-books"
                      className="block px-4 py-2 text-sm text-teal-700 hover:bg-teal-100"
                      role="menuitem"
                    >
                      Uploaded books
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
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
