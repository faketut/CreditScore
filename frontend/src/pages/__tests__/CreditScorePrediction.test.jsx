import { render, screen, fireEvent } from '@testing-library/react';
import CreditScorePrediction from '../CreditScorePrediction';
import axios from 'axios';

jest.mock('axios');

test('renders credit score prediction form', () => {
    render(<CreditScorePrediction />);
    expect(screen.getByPlaceholderText(/annual income/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/monthly expenses/i)).toBeInTheDocument();
});

test('displays predicted score on successful submission', async () => {
    axios.post.mockResolvedValueOnce({ data: { predicted_score: 750 } });
    render(<CreditScorePrediction />);
    fireEvent.change(screen.getByPlaceholderText(/annual income/i), { target: { value: '50000' } });
    fireEvent.change(screen.getByPlaceholderText(/monthly expenses/i), { target: { value: '2000' } });
    fireEvent.click(screen.getByText(/predict/i));
    expect(await screen.findByText(/your predicted credit score: 750/i)).toBeInTheDocument();
});

test('displays error message on failed prediction', async () => {
    axios.post.mockRejectedValue(new Error('Error predicting credit score'));
    render(<CreditScorePrediction />);
    fireEvent.click(screen.getByText(/predict/i));
    expect(await screen.findByText(/error predicting credit score. please try again./i)).toBeInTheDocument();
}); 