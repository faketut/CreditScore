import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const FinancialDataVisualization = () => {
    const [financialData, setFinancialData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/financial_data', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFinancialData(response.data);
                drawChart(response.data);
            } catch (error) {
                console.error('Error fetching financial data:', error);
            }
        };

        fetchData();
    }, []);

    const drawChart = (data) => {
        const svg = d3.select('#chart')
            .attr('width', 600)
            .attr('height', 400);

        svg.selectAll('*').remove();

        const x = d3.scaleBand()
            .domain(data.map(d => d.employment_status))
            .range([0, 600])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.annual_income)])
            .range([400, 0]);

        svg.append('g')
            .attr('transform', 'translate(0,400)')
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.employment_status))
            .attr('y', d => y(d.annual_income))
            .attr('width', x.bandwidth())
            .attr('height', d => 400 - y(d.annual_income));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Financial Data Visualization</h2>
            <svg id="chart"></svg>
        </div>
    );
};

export default FinancialDataVisualization; 