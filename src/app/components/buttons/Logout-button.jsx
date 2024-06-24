'use client'

const handleClick = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully😊')
    window.location.href = '/';
};

const LogoutButton = () => {
    return (
        <button className="navbar-button" onClick={handleClick}>Logout</button>
    );
};

export default LogoutButton;
