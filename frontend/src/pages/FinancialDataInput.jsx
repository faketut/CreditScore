import React, { useState } from 'react';
import axios from 'axios';

const FinancialDataInput = () => {
    const [formData, setFormData] = useState({
        annual_income: '',
        monthly_expenses: '',
        employment_status: '',
        credit_history_length: '',
        num_existing_loans: '',
        loan_amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/financial_data', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage('Financial data added successfully!');
            setFormData({
                annual_income: '',
                monthly_expenses: '',
                employment_status: '',
                credit_history_length: '',
                num_existing_loans: '',
                loan_amount: ''
            });
        } catch (err) {
            setErrorMessage('Error adding financial data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Input Financial Data</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="border p-2 w-full" type="number" name="annual_income" value={formData.annual_income} onChange={handleChange} placeholder="Annual Income" required />
                <input className="border p-2 w-full" type="number" name="monthly_expenses" value={formData.monthly_expenses} onChange={handleChange} placeholder="Monthly Expenses" required />
                <input className="border p-2 w-full" type="text" name="employment_status" value={formData.employment_status} onChange={handleChange} placeholder="Employment Status" required />
                <input className="border p-2 w-full" type="number" name="credit_history_length" value={formData.credit_history_length} onChange={handleChange} placeholder="Credit History Length (years)" required />
                <input className="border p-2 w-full" type="number" name="num_existing_loans" value={formData.num_existing_loans} onChange={handleChange} placeholder="Number of Existing Loans" required />
                <input className="border p-2 w-full" type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} placeholder="Loan Amount" required />
                <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            </form>
            {successMessage && <p className="mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default FinancialDataInput;