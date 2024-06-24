import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/globals.css';

const AddMealPlanForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    portionSize: '',
    calorieCount: '',
    carbCount: '',
    proteinCount: '',
    userId: ''
  });

  // Function to retrieve user ID from token
  const getUserID = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT token format');
      }

      const payload = JSON.parse(atob(parts[1])); // Decoding the payload

      if (!payload.userId) {
        throw new Error('User ID not found in token payload');
      }

      return payload.userId;
    } catch (error) {
      console.error('Error extracting user ID:', error.message);
      return null;
    }
  };

  useEffect(() => {
    getUserID().then((userId) => {
      // Store user ID in state once retrieved
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userId // Set userId in formData
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/users/${formData.userId}/meals`, formData);
      alert('Meal plan successfully added 😋');
      console.log('Meal Plan added:', res.data);
      window.location.href = '/welcome';
      // window.location.reload(); 
    } catch (error) {
      console.error('Error adding meal plan:', error);
    }
  };

  return (
    <div className="add-meal-plan-form-container">
      <h2>Add New Meal Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="url" name="image" value={formData.image} onChange={handleChange} required />
        </label>
        <label>
          Portion Size (g):
          <input type="number" name="portionSize" value={formData.portionSize} onChange={handleChange} required />
        </label>
        <label>
          Calorie Count:
          <input type="number" name="calorieCount" value={formData.calorieCount} onChange={handleChange} required />
        </label>
        <label>
          Carb Count:
          <input type="number" name="carbCount" value={formData.carbCount} onChange={handleChange} required />
        </label>
        <label>
          Protein Count:
          <input type="number" name="proteinCount" value={formData.proteinCount} onChange={handleChange} required />
        </label>

        <button type="submit">Add Meal Plan</button>
      </form>
    </div>
  );
};

export default AddMealPlanForm;
