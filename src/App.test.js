import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with title', () => {
  render(<App />);
  const linkElement = screen.getByText(/incident reporter/i);
  expect(linkElement).toBeInTheDocument();
});
