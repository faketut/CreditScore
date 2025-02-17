import React, { useState } from 'react';
import axios from 'axios';
import FeatureImportanceVisualization from '../components/FeatureImportanceVisualization';

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
    const [riskCategory, setRiskCategory] = useState(null);
    const [featureImportance, setFeatureImportance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            setPrediction(response.data.predicted_score);
            setRiskCategory(response.data.risk_category);

            const explanationResponse = await axios.post('http://localhost:5000/explain', formData);
            setFeatureImportance(explanationResponse.data.feature_importance);
        } catch (err) {
            setErrorMessage('Error predicting credit score. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Credit Score Prediction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="border p-2 w-full" type="number" name="annual_income" value={formData.annual_income} onChange={handleChange} placeholder="Annual Income" required />
                <input className="border p-2 w-full" type="number" name="monthly_expenses" value={formData.monthly_expenses} onChange={handleChange} placeholder="Monthly Expenses" required />
                <input className="border p-2 w-full" type="text" name="employment_status" value={formData.employment_status} onChange={handleChange} placeholder="Employment Status" required />
                <input className="border p-2 w-full" type="number" name="credit_history_length" value={formData.credit_history_length} onChange={handleChange} placeholder="Credit History Length (years)" required />
                <input className="border p-2 w-full" type="number" name="num_existing_loans" value={formData.num_existing_loans} onChange={handleChange} placeholder="Number of Existing Loans" required />
                <input className="border p-2 w-full" type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} placeholder="Loan Amount" required />
                <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Predict'}</button>
            </form>
            {prediction && <p className="mt-4">Predicted Score: {prediction}</p>}
            {riskCategory && <p>Risk Category: {riskCategory}</p>}
            {featureImportance.length > 0 && <FeatureImportanceVisualization featureImportance={featureImportance} />}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default CreditScorePrediction;