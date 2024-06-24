'use client'

import React from 'react';
import LoginButton from './buttons/Login-button';
import RegisterButton from './buttons/Register-button';
import LogoutButton from './buttons/Logout-button';
import AddPlanButton from './buttons/AddPlan-button';
import '../styles/globals.css';

const isTokenPresent = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <h1>🍎 Know What You Eat</h1>
      <div className='navbar-buttons'>
        {!isTokenPresent() && (
          <div className='navbar-logged-out'>
            <LoginButton />
            <RegisterButton />
          </div>
        )}
        {isTokenPresent() && (
          <div className='navbar-logged-in'>
            <LogoutButton />
            <AddPlanButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
