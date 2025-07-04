// src/components/BenefitSection.jsx
import React from 'react';
import BenefitCard from '../BenefitCard/BenefitCard';
import img1 from '../../../../assets/143Z_2209.w018.n001.30B.p12.30.jpg'
import img2 from "../../../../assets/3895208.jpg"
import img3 from "../../../../assets/3641599.jpg"



const benefits = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: img1
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: img2
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: img3
    }
];


const BenefitSection = () => {
    return (
        <section className="py-12 px-4 max-w-6xl mx-auto">
            <div className="space-y-6">
                {benefits.map((benefit) => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
            </div>
        </section>
    );
};

export default BenefitSection;
