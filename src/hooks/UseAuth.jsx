import React, { use } from 'react';
import { AuthContext } from '../Contexts/AutoContext/AuthContext';

const UseAuth = () => {
    const userInfo = use(AuthContext);
    return userInfo;
};

export default UseAuth;