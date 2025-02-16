import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserRoleManagement from '../UserRoleManagement'; // Assuming you have a component for managing roles
import axios from 'axios';

jest.mock('axios');

test('renders user role management', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', role: 'admin' }] });
    render(<UserRoleManagement />);
    expect(screen.getByText(/user role management/i)).toBeInTheDocument();
    expect(await screen.findByText(/test@example.com/i)).toBeInTheDocument();
});

test('updates user role', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: '1', email: 'test@example.com', role: 'user' }] });
    axios.put.mockResolvedValueOnce({});
    render(<UserRoleManagement />);
    fireEvent.click(screen.getByText(/edit role/i));
    fireEvent.change(screen.getByPlaceholderText(/role/i), { target: { value: 'admin' } });
    fireEvent.click(screen.getByText(/update/i));
    await waitFor(() => expect(screen.getByText(/admin/i)).toBeInTheDocument());
}); 