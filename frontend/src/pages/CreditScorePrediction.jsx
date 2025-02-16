import React, { useState } from 'react';
import axios from 'axios';

const CreditScorePrediction = () => {
    const [formData, setFormData] = useState({
        annual_income: '',
        monthly_expenses: '',
        employment_status: '',
        credit_history_length: '',
        num_existing_loans: '',
        loan_amount: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(''); // Reset error message
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            setPrediction(response.data.predicted_score);
        } catch (err) {
            setErrorMessage('Error predicting credit score. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Predict Your Credit Score</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="annual_income" value={formData.annual_income} onChange={handleChange} placeholder="Annual Income" required />
                <input type="number" name="monthly_expenses" value={formData.monthly_expenses} onChange={handleChange} placeholder="Monthly Expenses" required />
                <input type="text" name="employment_status" value={formData.employment_status} onChange={handleChange} placeholder="Employment Status" required />
                <input type="number" name="credit_history_length" value={formData.credit_history_length} onChange={handleChange} placeholder="Credit History Length (years)" required />
                <input type="number" name="num_existing_loans" value={formData.num_existing_loans} onChange={handleChange} placeholder="Number of Existing Loans" required />
                <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} placeholder="Loan Amount" required />
                <button type="submit" disabled={loading}>{loading ? 'Predicting...' : 'Predict'}</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {prediction && <h3>Your Predicted Credit Score: {prediction}</h3>}
        </div>
    );
};

export default CreditScorePrediction; 