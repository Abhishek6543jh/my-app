import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

// Mock the entire 'firebase/firestore' module
jest.mock('firebase/firestore');

// Mock the data that your component fetches
const mockBooks = [
  {
    id: '3Rc6dqwACgX12xT0T3ZI',
    title: 'The Power of Your Subconscious Mind: Original Edition',
    author: 'Joseph Murphy',
    publisher: 'Srishti Publishers',
    publishedDate: '12 October 2020',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookexchange-7e8ea.appspot.com/o/bookImages%2FWhatsApp%20Image%202024-01-02%20at%2021.14.12.jpeg?alt=media&token=c39a4430-035a-40ee-a8e2-b483137aee54',
    userId: 'ZfWEI0BKtKeNPyru5PbkpbrtsTF2',
    displayName: 'kalthireddy Abhishek',
    userPic: 'https://lh3.googleusercontent.com/a/ACg8ocIksaXtGMa3hhHM7qhu7Ey4dxCaMkZmiy_kCxgzTrBF=s96-c',
  },
];

beforeEach(() => {
  // Mock the collection and getDocs functions
  const mockGetDocs = jest.fn(() => ({
    docs: mockBooks.map((data) => ({
      id: data.id,
      data: () => data,
    })),
  }));

  const mockCollection = jest.fn(() => ({
    getDocs: mockGetDocs,
  }));

  // Set up the mock for the db object
  db.collection = mockCollection;
});

test('renders without errors', async () => {
  render(<Home />);
  // Wait for data fetching to complete
  await screen.findByText('Author');

  // Ensure that the component renders without throwing any errors
  expect(screen.getByText('Books')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search books...')).toBeInTheDocument();
  // Add more assertions based on your component's functionality
});
