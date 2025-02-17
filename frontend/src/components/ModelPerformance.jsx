import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModelPerformance = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/admin/model/performance', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPerformanceData(response.data);
            } catch (error) {
                setErrorMessage('Error fetching model performance. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold">Model Performance</h2>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Accuracy</th>
                        <th className="border px-4 py-2">Precision</th>
                        <th className="border px-4 py-2">Recall</th>
                    </tr>
                </thead>
                <tbody>
                    {performanceData.map((data, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{data.date}</td>
                            <td className="border px-4 py-2">{data.accuracy}</td>
                            <td className="border px-4 py-2">{data.precision}</td>
                            <td className="border px-4 py-2">{data.recall}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModelPerformance;