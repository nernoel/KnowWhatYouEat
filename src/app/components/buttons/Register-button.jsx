'use client'

import { useRouter } from 'next/navigation'
import '../../styles/globals.css';

export const RegisterButton = () => {
    const router = useRouter();

    const handleClick = () => {
        // push to registration form if not logged in
        router.push('/register'); 
    };

    return (
        <button onClick={handleClick} className="navbar-button">Register</button>
    );
};

export default RegisterButton;
