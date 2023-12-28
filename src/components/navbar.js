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
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Book Exchange
        </span>
      </div>
      <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
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
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow lg:flex lg:items-center lg:justify-end">
          

          {user ? (
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={toggleMenu}
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white focus:outline-none"
                >
                  {user.displayName}
                  <svg
                    className="ml-2 h-4 w-4 inline-block"
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
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
