'use client'
import { useRouter } from 'next/navigation';

const AddPlanButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/addplan');
    };

    return (
        <button className="navbar-button" onClick={handleClick}>Add Plan</button>
    );
};

export default AddPlanButton;
