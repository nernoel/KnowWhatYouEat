'use client'

import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/globals.css';

const EditMealForm = ({ meals, handleMealSelect, selectedMeal }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    portionSize: '',
    calorieCount: '',
    carbCount: '',
    proteinCount: ''
  });

  const handleSubmit = async (e, selectedMeal) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/api/meals/${selectedMeal._id}`, formData);
      alert('Meal successfully updated');
      window.location.href='/welcome'
      // Reset form fields after successful update
      setFormData({
        title: '',
        image: '',
        portionSize: '',
        calorieCount: '',
        carbCount: '',
        proteinCount: ''
      });
      setSelectedMeal(null);
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-meal-form-container">
      <h2>Edit Meal</h2>
      <select onChange={(e) => handleMealSelect(JSON.parse(e.target.value))}>
        <option value="">Select a meal</option>
        {meals.map((meal) => (
          <option key={meal._id} value={JSON.stringify(meal)}>{meal.title}</option>
        ))}
      </select>
      {selectedMeal && (
        <form onSubmit={(e) => handleSubmit(e, selectedMeal)}>
          <label>Title:<input type="text" name="title" value={formData.title} onChange={handleChange} required /></label>
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
          <button type="submit">Update Meal</button>
        </form>
      )}
    </div>
  );
};

export default EditMealForm;
