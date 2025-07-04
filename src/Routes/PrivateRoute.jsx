import React from 'react';
import { Navigate } from 'react-router';
import UseAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {

    const { user, loading } = UseAuth();

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }




    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }


    return children;
};

export default PrivateRoute;