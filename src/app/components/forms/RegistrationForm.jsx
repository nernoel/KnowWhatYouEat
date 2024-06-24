import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/globals.css'; // Import the CSS file

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users', formData);
      console.log('User registered:', response.data);
      
      const isConfirmed = window.confirm(
        "Account created! Do you want to proceed to the login page?"
      );

      if(isConfirmed){
        window.location.href = "/login";
      }

      else {
        alert("Account already exists")
      }
        
      
    } catch (error) {
      console.error('Registration failed:', error);
  
    }
  };

  return (
    <div className="registration-form-container"> {/* Add class name for styling */}
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
