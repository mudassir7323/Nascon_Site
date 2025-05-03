import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl';

const ProtectedRoutes = ({ children, isAuthenticated }) => {
    const [isValidated, setIsValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                
                if (!access_token) {
                    setIsValidated(false);
                    setIsLoading(false);
                    return;
                }

                const response = await fetch(`${BaseUrl}/auth/check`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Store user data in localStorage or context if needed
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setIsValidated(true);
                } else {
                    // Token invalid or expired
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('user');
                    setIsValidated(false);
                }
            } catch (error) {
                console.error('Auth validation error:', error);
                setIsValidated(false);
            } finally {
                setIsLoading(false);
            }
        };

        validateAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    return isValidated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;