import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders location input and generator heading', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/taj mahal/i);
  expect(inputElement).toBeInTheDocument();
  expect(screen.getByText(/location qr code generator/i)).toBeInTheDocument();
});

test('shows error when generating with empty input', () => {
  render(<App />);
  userEvent.click(screen.getByText(/generate qr code/i));
  expect(screen.getByRole('alert')).toHaveTextContent(/enter your location/i);
});

test('generates QR and download button after entering a location', () => {
  render(<App />);
  userEvent.type(screen.getByPlaceholderText(/taj mahal/i), 'Taj Mahal, Agra');
  userEvent.click(screen.getByText(/generate qr code/i));
  expect(screen.getByText(/view on google maps/i)).toBeInTheDocument();
  expect(screen.getByText(/download qr code/i)).toBeInTheDocument();
});
