import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRoleManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedRole, setUpdatedRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/users');
                setUsers(response.data);
            } catch (err) {
                setErrorMessage('Error fetching user data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditRole = (user) => {
        setSelectedUser(user);
        setUpdatedRole(user.role);
    };

    const handleUpdateRole = async () => {
        try {
            await axios.put(`http://localhost:5000/admin/users/${selectedUser.id}`, { role: updatedRole });
            setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, role: updatedRole } : user)));
            setSelectedUser(null);
        } catch (err) {
            setErrorMessage('Error updating user role. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>User Role Management</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.email} - Role: {user.role}
                            <button onClick={() => handleEditRole(user)}>Edit Role</button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedUser && (
                <div>
                    <h3>Edit Role for {selectedUser.email}</h3>
                    <input
                        type="text"
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                        placeholder="Role"
                    />
                    <button onClick={handleUpdateRole}>Update</button>
                    <button onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default UserRoleManagement; 