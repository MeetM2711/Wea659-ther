// src/Components/ApiComponent.js
import axios from 'axios';

const API_KEY = '7ojim7L1hFRPj6WbAdLYgkgA5imkdDBy';
const BASE_URL = 'https://api.tomorrow.io/v4/weather/history/recent';

export const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}?location=${location}&timesteps=1d&units=metric&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
