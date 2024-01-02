import { render, screen } from '@testing-library/react';
import Home from './home';
import React from 'react';


    test('renders without errors', () => {
      render(<Home />);
      // Ensure that the component renders without throwing any errors
      expect(screen.getByText('Book Exchange')).toBeInTheDocument();
    });
  
    // Add more tests as needed based on your component's functionality
