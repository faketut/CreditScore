import React, { useState, useEffect } from 'react';
import axios from 'react';

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

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Activity Logs</h2>
            
            {loading ? (
                <p>Loading logs...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">User</th>
                                    <th className="px-4 py-2">Action</th>
                                    <th className="px-4 py-2">Details</th>
                                    <th className="px-4 py-2">IP Address</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id} className="border-t">
                                        <td className="px-4 py-2">{log.user_id || 'System'}</td>
                                        <td className="px-4 py-2">{log.action}</td>
                                        <td className="px-4 py-2">{log.details}</td>
                                        <td className="px-4 py-2">{log.ip_address}</td>
                                        <td className="px-4 py-2">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => fetchLogs(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => fetchLogs(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityLogs; 