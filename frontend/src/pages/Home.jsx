import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import axios from 'axios';

const Home = () => {
    const [balance, setBalance] = useState(null);
    const [creditScore, setCreditScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return; // User is not logged in, do not fetch data
            }

            try {
                const balanceResponse = await axios.get('http://localhost:5000/api/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const creditScoreResponse = await axios.get('http://localhost:5000/api/credit-score', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBalance(balanceResponse.data.balance);
                setCreditScore(creditScoreResponse.data.score);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!balance && !creditScore) return <p className="text-gray-500 text-center">Please log in to see your dashboard.</p>;

    return (
        <div className="home min-h-screen bg-gray-100">
            <Navbar />
            <div className="content p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Your Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="My Balance" content={`S$${balance}`} />
                    <Card title="Credit Score Prediction" content={`Your predicted score is ${creditScore}.`} />
                    <Card title="Recent Transactions" content="No recent transactions." />
                </div>
                <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Get Started</h2>
                    <p className="text-gray-600">Explore your financial data and understand your credit score better.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;