import React from 'react';
import { Bar } from 'react-chartjs-2';

const FeatureImportanceVisualization = ({ featureImportance }) => {
    const data = {
        labels: ['Annual Income', 'Monthly Expenses', 'Employment Status', 'Credit History Length', 'Number of Existing Loans', 'Loan Amount'],
        datasets: [
            {
                label: 'Feature Importance',
                data: featureImportance,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">Feature Importance</h2>
            <Bar data={data} />
        </div>
    );
};

export default FeatureImportanceVisualization;