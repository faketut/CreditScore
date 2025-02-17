import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModelManagement from '../components/ModelManagement';
import ActivityLogs from '../components/ActivityLogs';
import ModelPerformance from '../components/ModelPerformance';
import UserManagement from '../components/UserManagement';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get('http://localhost:5000/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(userResponse.data);

                const performanceResponse = await axios.get('http://localhost:5000/admin/model/performance', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPerformanceData(performanceResponse.data);
            } catch (error) {
                setErrorMessage('Error fetching data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRetrainModel = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/admin/retrain_model', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Model retraining initiated.');
        } catch (error) {
            setErrorMessage('Error initiating model retraining. Please try again.');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user.id !== userId));
            setMessage('User deleted successfully');
        } catch (error) {
            setMessage('Error deleting user');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

    return (
        <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ModelManagement />
                <ModelPerformance />
            </div>
            <UserManagement />
            <ActivityLogs />
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <h3 className="text-xl">User Data</h3>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Created At</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.created_at}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="text-xl">Model Performance</h3>
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
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleRetrainModel}>Retrain Model</button>
            {message && <p className="text-green-500">{message}</p>}
        </div>
    );
};

export default AdminDashboard;