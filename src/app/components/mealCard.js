import React from 'react';
import axios from 'axios';
import '../styles/globals.css';

const MealCard = ({ meal }) => {
  if (!meal) {
    return <div>Loading...</div>;
  }

  const handleDeletion = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this plan?')) {
        await axios.delete(`http://localhost:3001/api/meals/${meal._id}`);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleClick = () => {
    window.location.href = '/editmeal';
  };

  return (
    <div className="meal-card">
      <img src={meal.image} alt={meal.title} />
      <div className="meal-card-content">
        <h5>{meal.title}</h5>
        <ul>
          <li>Portion Size: {meal.portionSize}g</li>
          <li>Calorie Count: {meal.calorieCount}</li>
          <li>Carb Count: {meal.carbCount}</li>
          <li>Protein Count: {meal.proteinCount}</li>
        </ul>
        <div className='meal-card-buttons'>
        <button onClick={handleClick}>Edit Details</button>
        <button onClick={handleDeletion}>Delete plan</button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
