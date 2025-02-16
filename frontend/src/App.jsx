import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import FinancialDataInput from './pages/FinancialDataInput';
import CreditScorePrediction from './pages/CreditScorePrediction';
import './App.css'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/financial-data" component={FinancialDataInput} />
                <Route path="/predict" component={CreditScorePrediction} />
                <Route path="/" exact>
                    <h1>Welcome to the Credit Score Model</h1>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
