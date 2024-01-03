import { render, screen } from '@testing-library/react';
import Home from './home';
import MyUploadedBooks from './MyUploadedBooks';
import BookUpload from './UploadBook';
import React from 'react';
import { useAuth } from "./AuthContext";
import '@testing-library/jest-dom';


jest.mock("./AuthContext");

test('Home componenet renders without errors', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Books/i);
    expect(linkElement).toBeInTheDocument();
  })
test('bookupload componenet renders without errors', () => {
    render(<BookUpload />);
    const linkElement = screen.getByText(/Title/i);
    expect(linkElement).toBeInTheDocument();
  })
  test("myuploadedbooks component renders without errors", () => {
    // Set up a mock currentUser for the test
    useAuth.mockReturnValue({ currentUser: { uid: "testUserId" } });
  
    // Render the component
    render(<MyUploadedBooks />);
  
    // Check if the component renders without errors
    const linkElement = screen.getByText(/My Uploaded Books/i);
    expect(linkElement).toBeInTheDocument();
  });