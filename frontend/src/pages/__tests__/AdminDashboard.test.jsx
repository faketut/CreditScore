import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../AdminDashboard';
import axios from 'axios';

jest.mock('axios');

test('renders admin dashboard and fetches user data', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', first_name: 'John', last_name: 'Doe' }] });
    render(<AdminDashboard />);
    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/test@example.com/i)).toBeInTheDocument();
});

test('displays error message on failed data fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching user data'));
    render(<AdminDashboard />);
    expect(await screen.findByText(/error fetching user data. please try again./i)).toBeInTheDocument();
});

test('deletes user and updates the list', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', first_name: 'John', last_name: 'Doe' }] });
    axios.delete.mockResolvedValueOnce({});
    render(<AdminDashboard />);
    expect(await screen.findByText(/test@example.com/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/delete/i));
    await waitFor(() => expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument());
});

test('views user details', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', first_name: 'John', last_name: 'Doe' }] });
    render(<AdminDashboard />);
    expect(await screen.findByText(/test@example.com/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/view details/i));
    expect(screen.getByText(/user details/i)).toBeInTheDocument();
    expect(screen.getByText(/first name: john/i)).toBeInTheDocument();
});

test('edits user profile', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', first_name: 'John', last_name: 'Doe' }] });
    axios.put.mockResolvedValueOnce({});
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.click(screen.getByText(/update/i));
    await waitFor(() => expect(screen.getByText(/jane/i)).toBeInTheDocument());
});

test('updates user profile', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', first_name: 'John', last_name: 'Doe' }] });
    axios.put.mockResolvedValueOnce({});
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.click(screen.getByText(/update/i));
    await waitFor(() => expect(screen.getByText(/jane/i)).toBeInTheDocument());
}); 