import { render, screen, fireEvent } from '@testing-library/react';
import FinancialDataInput from '../FinancialDataInput';
import axios from 'axios';

jest.mock('axios');

test('renders financial data input form', () => {
    render(<FinancialDataInput />);
    expect(screen.getByPlaceholderText(/user id/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/annual income/i)).toBeInTheDocument();
});

test('displays success message on successful submission', async () => {
    axios.post.mockResolvedValueOnce({});
    render(<FinancialDataInput />);
    fireEvent.change(screen.getByPlaceholderText(/user id/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/annual income/i), { target: { value: '50000' } });
    fireEvent.click(screen.getByText(/submit/i));
    expect(await screen.findByText(/financial data added successfully/i)).toBeInTheDocument();
}); 