import React from 'react';
import img1 from '../../../assets/brands/amazon.png'
import img2 from '../../../assets/brands/amazon_vector.png'
import img3 from '../../../assets/brands/casio.png'
import img4 from '../../../assets/brands/logo.png'
import img5 from '../../../assets/brands/moonstar.png'
import img6 from '../../../assets/brands/randstad.png'
import img7 from '../../../assets/brands/start-people 1.png'
import img8 from '../../../assets/brands/start.png'
import Marquee from 'react-fast-marquee';


const logos = [img1, img2, img3, img4, img5, img6, img7, img8]


const ClientLogoMarque = () => {
    return (
        <div>
            <section className="py-8 bg-base-200 my-10">
                <h2 className="text-center text-2xl font-semibold mb-6">We've helped thousands of sales teams</h2>
                <Marquee speed={50} pauseOnHover={true} gradient={false} className='gap-[100px] mt-10'>
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-15">
                            <img src={logo} alt={`Company ${index + 1}`} className="h-6 w-auto" />
                        </div>
                    ))}
                </Marquee>
               
            </section>
             <div className="border-dashed mb-10 border-1 border-gray-300"></div>
        </div>
    );
};

export default ClientLogoMarque;