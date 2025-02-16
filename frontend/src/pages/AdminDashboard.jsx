import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityLogs from '../components/ActivityLogs';

const AdminDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/users');
                setUserData(response.data);
            } catch (err) {
                setErrorMessage('Error fetching user data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/users/${userId}`);
            setUserData(userData.filter(user => user.id !== userId));
        } catch (err) {
            setErrorMessage('Error deleting user. Please try again.');
            console.error(err);
        }
    };

    const handleViewUserDetails = (user) => {
        setSelectedUser(user);
    };

    const handleEditUser = (user) => {
        setUpdatedUser(user);
        setEditMode(true);
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:5000/admin/users/${updatedUser.id}`, updatedUser);
            setUserData(userData.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setEditMode(false);
            setSelectedUser(null);
        } catch (err) {
            setErrorMessage('Error updating user. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="p-6 space-y-8">
            <h2>Admin Dashboard</h2>
            {loading ? (
                <p>Loading...</p>
            ) : errorMessage ? (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            ) : (
                <div>
                    <ul>
                        {userData.map(user => (
                            <li key={user.id}>
                                {user.email} - {user.first_name} {user.last_name}
                                <button onClick={() => handleViewUserDetails(user)}>View Details</button>
                                <button onClick={() => handleEditUser(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    {selectedUser && !editMode && (
                        <div>
                            <h3>User Details</h3>
                            <p>Email: {selectedUser.email}</p>
                            <p>First Name: {selectedUser.first_name}</p>
                            <p>Last Name: {selectedUser.last_name}</p>
                            <button onClick={() => setSelectedUser(null)}>Close</button>
                        </div>
                    )}
                    {editMode && (
                        <div>
                            <h3>Edit User</h3>
                            <input
                                type="text"
                                value={updatedUser.first_name}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                value={updatedUser.last_name}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
                                placeholder="Last Name"
                            />
                            <button onClick={handleUpdateUser}>Update</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            )}
            <ActivityLogs />
        </div>
    );
};

export default AdminDashboard; 