// Title: Simple Weather Data Proxy API in Node.js (100 Lines)

// Required modules
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Replace with your actual OpenWeatherMap API key
const OPENWEATHER_API_KEY = 'your_api_key_here';




// Basic homepage
app.get('/', (req, res) => {
    res.send('<h2>Weather API Proxy</h2><p>Use /weather?city=CityName to get weather data.</p>');
});

// Weather endpoint (fetches data from OpenWeatherMap)
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ message: 'City is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );

        const weatherData = response.data;
        const result = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed
        };

        res.json(result);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(500).json({ message: 'Failed to fetch weather data' });
        }
    }
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Weather API Proxy running at http://localhost:${PORT}`);
});
