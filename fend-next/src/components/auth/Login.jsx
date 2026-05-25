"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';

const Login = () => {
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.replace('/admin');
        } else {
            setReady(true);
        }
    }, [router]);

    if (!ready) {
        return null;
    }

    return (
        <div className="grid items-center justify-center w-full h-[500px] md:h-[700px]">
            <LoginForm />
        </div>
    );
};

export default Login;
