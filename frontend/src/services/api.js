import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback to a default URL

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const addFinancialData = async (financialData, token) => {
    return await axios.post(`${API_URL}/financial_data`, financialData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const predictScore = async (data, token) => {
    return await axios.post(`${API_URL}/predict`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};