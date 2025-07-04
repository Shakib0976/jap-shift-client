// src/components/BenefitCard.jsx
import React from 'react';

const BenefitCard = ({ benefit, animation = 'fade-up' }) => {

    const { title, description, image } = benefit;
    return (
        <div data-aos={animation} // ✅ AOS animation added
            data-aos-duration="800" className="card flex-col lg:card-side justify-center items-center lg:flex-row bg-base-100 shadow-md  p-4 gap-4">
            <figure className="w-full lg:w-1/3">
                <img
                    src={image}
                    alt={title}
                    className="rounded-md object-cover w-full h-40 lg:h-40 "
                />
            </figure>

            {/* Divider: horizontal on mobile, vertical on large */}
            <div className="divider my-2 lg:divider-horizontal"></div>

            <div className="card-body p-0 lg:p-4">
                <h2 className="card-title text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;
