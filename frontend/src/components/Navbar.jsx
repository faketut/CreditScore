import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <h1 className="text-white text-2xl">Credit Score Model</h1>
            <ul className="flex space-x-4">
                <li><Link className="text-white hover:text-gray-300" to="/">Home</Link></li>
                <li><Link className="text-white hover:text-gray-300" to="/login">Login</Link></li>
                <li><Link className="text-white hover:text-gray-300" to="/register">Register</Link></li>
                <li><Link className="text-white hover:text-gray-300" to="/financial-data">Financial Data</Link></li>
                <li><Link className="text-white hover:text-gray-300" to="/predict">Predict Score</Link></li>
                <li><Link className="text-white hover:text-gray-300" to="/admin">Admin Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;