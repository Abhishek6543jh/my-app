import '@testing-library/jest-dom';
import 'jest-extended'; // If you want to use Jest Extended matchers
import { render } from '@testing-library/react';

// Add a global render function to render components in tests
global.render = render;

// Make React available globally
global.React = require('react');
