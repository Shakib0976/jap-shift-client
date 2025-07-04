// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;
    return (
        <div className="card bg-base-100 shadow-xl hover:bg-lime-300 justify-center items-center text-center py-10  px-4 hover:shadow-2xl transition duration-300">
            <div className="text-primary text-4xl mb-4">
                <Icon />
            </div>
            <h2 className="card-title text-lg font-semibold text-primary">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default ServiceCard;
