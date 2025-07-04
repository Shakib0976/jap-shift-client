import React from 'react';
import authImg from '../assets/authImage.png'
import { Outlet } from 'react-router';
import ProfastLogo from '../pages/Shared/ProfastLogo/ProfastLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen p-12 ">
            <div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content  flex-col lg:flex-row-reverse">
                <div className='flex-1 '>
                    <img
                        src={authImg}
                        className="max-w-sm rounded-lg "
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;