import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../../../Components/Services/ServicesSection';
import ClientLogoMarque from '../ClientLogoMarque/ClientLogoMarque';
import BenefitSection from '../Benifit/BenifitSection/BenifitSection';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWork/HowItWork';
import TestimonialSection from '../Testimonial/Testomonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <ServicesSection></ServicesSection>
            <ClientLogoMarque></ClientLogoMarque>
            <BenefitSection></BenefitSection>
            <BeMerchant></BeMerchant>
            <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Home;