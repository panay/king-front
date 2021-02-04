import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app text inside the component', () => {
  render(<App />);
  const el = screen.getByText(/ебанешься/i);
  expect(el).toBeInTheDocument();
});
