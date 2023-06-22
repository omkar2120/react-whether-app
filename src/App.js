import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import "./App.css"
export const WeatherIcons = {
  "01d": "/icon/sunny.svg",
  "01n": "/icon/night.svg",
  "02d": "/icon/day.svg",
  "02n": "/icon/cloudy-night.svg",
  "03d": "/icon/cloudy.svg",
  "03n": "/icon/cloudy.svg",
  "04d": "/icon/perfect-day.svg",
  "04n": "/icon/cloudy-night.svg",
  "09d": "/icon/rain.svg",
  "09n": "/icon/rain-night.svg",
  "10d": "/icon/rain.svg",
  "10n": "/icon/rain-night.svg",
  "11d": "/icon/storm.svg",
  "11n": "/icon/storm.svg",
  "13d": "/icon/rain.svg",
  "13n": "/icon/rain.svg",
  "50d": "/icon/rain-night.svg",
  "50n": "/icon/rain-night.svg",
};

const API_KEY = '075ccf49e66541d712e3bace68c4afc0';

const Weather = () => {
  
  const [city, setCity] = useState("Pune")

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const date = new Date()


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const response2 = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)

        setForecastData(response2.data.list)
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };



    fetchWeatherData();

    const interval = setInterval(fetchWeatherData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather, wind, sys,name } = weatherData;
  const { temp, humidity } = main;
  const { speed } = wind;
  const { sunrise, sunset } = sys;

  return (
    <div class="wrapper">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
      <div class="widget-container">
        <div style={{ display: "flex", justifyContent: "right", padding: "8px" }}>
        <input defaultValue={city} type="text" style={{width:"30%"}} class="form-control" onChange={(e)=>setCity(e.target.value)} placeholder="Enter city name"/>

        </div>
        <div class="top-left">
          <h1 class="city" id="city">{name}</h1>
          <h2 id="day">{date.toDateString()}</h2>
          <h3 id="date"></h3>
          <h3 id="time">{`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`}</h3>
          <p class="geo"></p>
        </div>
        <div class="top-right">
          <h1 id="weather-status">Weather / {weather[0].main}</h1>
          <img class="weather-icon" src={WeatherIcons[weather[0].icon]} />
        </div>
        <div class="horizontal-half-divider"></div>
        <div class="bottom-left">
          <h1 id="temperature">{Math.round(temp - 273.15)}</h1>
          <h2 id="celsius">°C</h2>
        </div>
        <div class="vertical-half-divider"></div>
        <div class="bottom-right">
          <div class="other-details-key">
            <p>Wind Speed</p>
            <p>Humidity</p>
            <p>Pressure</p>
            <p>Sunrise Time</p>
            <p>Sunset Time</p>
          </div>
          <div class="other-details-values">
            <p class="windspeed">{speed} m/s</p>
            <p class="humidity">{humidity}%</p>
            <p class="pressure">0 hPa</p>
            <p class="sunrise-time">{new Date(sunrise * 1000).toLocaleTimeString()}</p>
            <p class="sunset-time">{new Date(sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>

      </div>
      </div>

      <div style={{backgroundColor:"",display:"flex",flexWrap:"wrap",gap:"30px"}}>
        {forecastData.map((frc, inx) => (
          <div>
            <label>{frc.dt_txt.split(" ")[0]} {frc.dt_txt.split(" ")[1].split(":")[0]}:{frc.dt_txt.split(" ")[1].split(":")[1]}</label>
            <br />
            <img class="weather-icon" src={WeatherIcons[frc.weather[0].icon]} />
          </div>
        ))}
      </div>

    </div>

  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Weather/>} />
      </Routes>
    </div>
  );
};

export default App;
