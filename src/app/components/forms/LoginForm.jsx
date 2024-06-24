import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/globals.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData); // Send login request
      const token = response.data.token; // Assuming server responds with a token
      localStorage.setItem('token', token); // Store token in local storage
      window.location.href = '/welcome';
    } catch (error) {
      setError('Invalid email or password'); // Handle login error
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login to get started!</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
