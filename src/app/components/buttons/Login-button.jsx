'use client'

import { useRouter } from 'next/navigation'
import '../../styles/globals.css';

export const LoginButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login'); // push to login page on routing
    };

    return (
        <button className='navbar-button' onClick={handleClick} >Login</button>
    );
};

export default LoginButton;
