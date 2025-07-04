// src/components/ServicesSection.jsx
import React from 'react';
import ServiceCard from './ServicesCard';
import { services } from './Data/Services';


const ServicesSection = () => {
    return (
        <section className="py-20 rounded-2xl px-4 lg:px-16 bg-[#03373D]  my-10">
            <div className="text-center mb-10 max-w-2xl mx-auto">
                <h3 className="text-4xl text-white font-bold mb-4 ">Our Services</h3>
                <p className="text-gray-500">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        service={service}
                    />
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
