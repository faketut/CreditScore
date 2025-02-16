import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import axios from 'axios';

jest.mock('axios');

test('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});

test('displays error message on failed login', async () => {
    axios.post.mockRejectedValue(new Error('Invalid credentials'));
    render(<Login />);
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
}); 