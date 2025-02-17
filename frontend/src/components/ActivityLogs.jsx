import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        totalItems: 0
    });

    const fetchLogs = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/admin/activity-logs?page=${page}`);
            setLogs(response.data.logs);
            setPagination({
                page: response.data.current_page,
                totalPages: response.data.pages,
                totalItems: response.data.total
            });
        } catch (err) {
            setError('Failed to fetch activity logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold">Activity Logs</h2>
            <ul>
                {logs.map(log => (
                    <li key={log.id} className="border p-2">{log.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLogs; 