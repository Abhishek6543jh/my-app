import { render, screen, waitFor } from '@testing-library/react';
import Home from './home';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

// Mock the getDocs function to simulate fetching data from Firebase
jest.mock('firebase/firestore', () => ({
    ...jest.requireActual('firebase/firestore'),
    getDocs: jest.fn(() => ({
      docs: [
        { id: '1', data: () => ({ title: 'Book 1', author: 'Author 1' }) },
        { id: '2', data: () => ({ title: 'Book 2', author: 'Author 2' }) },
      ],
    })),
  }));
describe('Home Component', () => {
  test('displays books when books match the search term', async () => {
    render(<Home />);

    // Wait for the books to be fetched and rendered
    await waitFor(() => {
      const bookElements = screen.getAllByTestId(/1|2/);
      expect(bookElements).toHaveLength(2);
    });

    // Test search functionality
    const searchInput = screen.getByPlaceholderText('Search books...');
    userEvent.type(searchInput, 'Book 1');

    // Wait for the component to re-render with filtered books
    await waitFor(() => {
      const filteredBookElement = screen.getByTestId('1');
      expect(filteredBookElement).toBeInTheDocument();
    });
  });

  test('displays "No results found" when no books match the search term', async () => {
    render(<Home />);

    // Wait for the books to be fetched and rendered
    await waitFor(() => {
      const bookElements = screen.getAllByTestId(/1|2/);
      expect(bookElements).toHaveLength(2);
    });

    // Test handling of no results
    const searchInput = screen.getByPlaceholderText('Search books...');
    userEvent.type(searchInput, 'Nonexistent Book');

    // Wait for the component to re-render with no results message
    await waitFor(() => {
      const noResultsMessage = screen.getByText(/No results found/i);
      expect(noResultsMessage).toBeInTheDocument();
    });
  });
});

