import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./hooks/useAuth', () => ({ useAuth: () => ({ currentUser: null, authLoading: false, actionLoading: false, error: '', login: jest.fn(), register: jest.fn(), loginWithGoogle: jest.fn(), logout: jest.fn(), clearError: jest.fn() }) }));

test('menampilkan halaman masuk', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /masuk ke akunmu/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
});
