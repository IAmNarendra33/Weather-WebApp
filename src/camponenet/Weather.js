import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [seasonSummary, setSeasonSummary] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const API_KEY = 'b9f23e6084080241d865828e7582d4bc';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;

        try {
          const response = await axios.get(API_URL);
          setWeatherData(response.data);
          const temp = response.data.main.temp;
          if (temp >= 30) {
            setSeasonSummary(' hot! Enjoy the summer weather.');
          } else if (temp <= 10) {
            setSeasonSummary(' cold! Bundle up for winter.');
          } else {
            setSeasonSummary('The weather is Natural.');
          }
        } catch (error) {
          console.error('Error fetching weather data: ', error);
          setWeatherData(null);
        }
      }
    };

    fetchData();
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className='box'>
        <div className='inputdata'>
          <input
            type='search'
            className='inputarea'
            onChange={handleInputChange}
            placeholder='Enter city name'
          />
        </div>

        <div className='information'>
          {weatherData ? (
            <>
              <h2 className='location'>
                <i ></i> {weatherData.name},{' '}
                {weatherData.sys.country}
              </h2>
              <h1 className='temp'>{weatherData.main.temp}°C</h1>
              <h3 className='tempmin_max'>
                Min: {weatherData.main.temp_min}°C
                Max: {weatherData.main.temp_max}°C
              </h3>
              <h1 className='wind'>Wind: {weatherData.wind.speed}km/h </h1>
              <p className='season-summary'>{seasonSummary}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
