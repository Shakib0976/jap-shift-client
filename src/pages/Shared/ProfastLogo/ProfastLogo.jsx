import React from 'react';
import logo from '../../../assets/brands/logo.png';
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
        <Link to='/' className='flex items-end'>
            <img className='mb-2' src={logo} alt="ProFast Logo" />
            <p className='text-3xl -ml-2 font-extrabold'>ProFast</p>
        </Link>
    );
};

export default ProfastLogo;
