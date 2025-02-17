import React, { useState } from 'react';
import { register } from '../services/authService';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setErrorMessage('');
        try {
            const response = await register(email, password);
            setMessage(response.message);
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input
                className="border p-2 w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                className="border p-2 w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            {message && <p>{message}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
    );
};

export default Register;