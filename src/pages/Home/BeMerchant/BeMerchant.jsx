import React from 'react';
import marchant from '../../../assets/banner../../../assets/location-merchant.png'

const BeMerchant = () => {

    return (
        <div
            data-aos="zoom-in-up" data-aos-duration="800"
            className="bg-no-repeat bg-cover bg-center bg-[url('/assets/be-a-merchant-bg.png')] bg-[#03373D] my-10 rounded-3xl p-6 sm:p-10 lg:p-20"
        >
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
                {/* Text Content */}
                <div className="text-white flex-1">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h1>
                    <p className="py-4 text-gray-300">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        {/* Primary Button */}
                        <a
                            href="#_"
                            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium bg-[#CAEB66] text-[#03373D] rounded-full hover:bg-white transition"
                        >
                            <span className="absolute inset-0 transition-all duration-200 ease-linear rounded-full group-hover:border-[25px] border-white"></span>
                            <span className="relative z-10">Become a Merchant</span>
                        </a>

                        {/* Secondary Outline Button */}
                        <a
                            href="#_"
                            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-[#CAEB66] border-2 border-[#CAEB66] rounded-full group"
                        >
                            <span className="absolute w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                            <span className="relative z-10">Earn with Profast Courier</span>
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1">
                    <img
                        src={marchant}
                        alt="Merchant"
                        className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg"
                    />
                </div>
            </div>
        </div>

    );
};

export default BeMerchant;