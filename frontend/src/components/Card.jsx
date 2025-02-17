import React from 'react';

const Card = ({ title, content }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

export default Card;