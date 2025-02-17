import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FinancialDataInput from './pages/FinancialDataInput';
import CreditScorePrediction from './pages/CreditScorePrediction';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/financial-data" element={<FinancialDataInput />} />
                <Route path="/predict" element={<CreditScorePrediction />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;