'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditMealForm from '../components/forms/EditMealForm';

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

const EditMealPage = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserID();
        const response = await axios.get(`http://localhost:3001/api/users/${userId}/meals`);
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchData();
  }, []);

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };


  return (
    <div>
      {/* Other content */}
      <EditMealForm
        meals={meals}
        handleMealSelect={handleMealSelect}
        selectedMeal={selectedMeal}
      />
      {/* Other content */}
    </div>
  );
};

export default EditMealPage;
