import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user'); 
        if (!user) {
            navigate('/ingresar', );
        }
    }, [navigate]);

    return children;
};

export default AuthGuard;