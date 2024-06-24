'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import MealCard from '../components/mealCard';
import Navbar from '../components/navbar';
import '../styles/globals.css';

// Main dashboard page
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [mealPlans, setMealPlans] = useState([]);

  // Dangerous use of retrieving userID but works... for now
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const token = localStorage.getItem('token');
        const token = localStorage.getItem('token')

        if (!token) {
          throw new Error('Token not found in local storage');
        }

        // Decode the payload (assuming Base64Url encoding)
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId; // Extract user ID from token

        const userDataResponse = await axios.get(`http://localhost:3001/api/users/${userId}`);
        setUser(userDataResponse.data);

        const mealPlansResponse = await axios.get(`http://localhost:3001/api/users/${userId}/meals`);
        setMealPlans(mealPlansResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="welcome-container">
          {user && <h1>Welcome {user.username}!</h1>}
          <h2>Meal Plans</h2>
          <div className="meal-plans">
            {mealPlans.map((mealPlan, index) => <MealCard key={index} meal={mealPlan} />) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

