import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase"; // Import your Firebase auth instance

// Create a context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap your app with the auth context
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to update the current user when the auth state changes
  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      updateCurrentUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
