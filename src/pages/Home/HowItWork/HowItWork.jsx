import React from 'react';
import 'aos/dist/aos.css';
import { FaShippingFast, FaMoneyBillWave, FaWarehouse, FaBuilding } from 'react-icons/fa';

const services = [
    {
        icon: <FaShippingFast className="text-4xl text-primary mb-4" />,
        title: 'Booking Pick & Drop',
        desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
        icon: <FaMoneyBillWave className="text-4xl text-primary mb-4" />,
        title: 'Cash On Delivery',
        desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
        icon: <FaWarehouse className="text-4xl text-primary mb-4" />,
        title: 'Delivery Hub',
        desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
        icon: <FaBuilding className="text-4xl text-primary mb-4" />,
        title: 'Booking SME & Corporate',
        desc: 'From personal packages to business shipments — we deliver on time, every time.',
    },
];

const HowItWorks = () => {
    return (
        <section className="py-12 px-4 md:px-8 bg-base-100">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className=" bg-base-100 hover:shadow-lime-300 shadow-md border border-gray-200 rounded-lg overflow-hidden 
                                   p-6 text-center transition transform duration-300 ease-out 
                                   hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="flex flex-col items-center">
                            {service.icon}
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
