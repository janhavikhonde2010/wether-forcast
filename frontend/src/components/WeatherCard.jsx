import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '3b262af693eff892909ddc85e8ac47b5';

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [yesterdayWeather, setYesterdayWeather] = useState(null);
  const [tomorrowWeather, setTomorrowWeather] = useState(null);

  const getCityCoordinates = async (cityName) => {
    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    if (res.data.length === 0) throw new Error('City not found');
    return res.data[0];
  };

  const getWeatherData = async (lat, lon) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return res.data;
  };

  const getHourlyForecast = async (lat, lon) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return res.data.list.slice(0, 12);
  };

  const getForecastForTomorrow = async (lat, lon) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const tomorrowForecast = res.data.list.filter((hour) => {
      const date = new Date(hour.dt * 1000);
      return date.getDate() === new Date().getDate() + 1;
    });
    return tomorrowForecast[0]; // Fetching the first available forecast for tomorrow
  };

  const getWeatherByCity = async () => {
    try {
      const coords = await getCityCoordinates(city);
      const current = await getWeatherData(coords.lat, coords.lon);
      const hourly = await getHourlyForecast(coords.lat, coords.lon);
      const tomorrow = await getForecastForTomorrow(coords.lat, coords.lon);

      // For yesterday, you'll need to use historical data (requires additional API and setup)
      const yesterday = await getWeatherData(coords.lat, coords.lon); // Placeholder for yesterday data

      setWeather(current);
      setHourlyForecast(hourly);
      setTomorrowWeather(tomorrow);
      setYesterdayWeather(yesterday); // This is a placeholder
    } catch (err) {
      alert('Error fetching weather');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 rounded-3xl bg-[#FFCAE9] text-black shadow-2xl">
      <div className="bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide">Weather App</h1>

        <div className="flex mb-6">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="flex-grow px-4 py-3 rounded-full text-black font-semibold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={getWeatherByCity}
            className="ml-3 p-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full transition duration-300"
          >
            🔍
          </button>
        </div>

        {weather && (
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather icon"
              className="mx-auto mb-4"
            />
            <h2 className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</h2>
            <p className="text-lg mt-2 font-semibold">{weather.name}</p>

            <div className="mt-6 flex justify-around">
              <div className="text-center">
                <p className="text-2xl">💧</p>
                <p className="text-md font-bold">{weather.main.humidity}%</p>
                <p className="text-xs text-black">Humidity</p>
              </div>
              <div className="text-center">
                <p className="text-2xl">💨</p>
                <p className="text-md font-bold">{weather.wind.speed} km/h</p>
                <p className="text-xs text-black">Wind</p>
              </div>
            </div>
          </div>
        )}

        {/* Display Yesterday's Weather (Placeholder for now) */}
        {yesterdayWeather && (
          <div className="text-center mt-6">
            <h3 className="text-xl font-bold">Yesterday's Weather</h3>
            <p className="text-lg">{Math.round(yesterdayWeather.main.temp)}°C</p>
            <p className="text-sm">{yesterdayWeather.weather[0].description}</p>
          </div>
        )}

        {tomorrowWeather && (
          <div className="text-center mt-6">
            <h3 className="text-xl font-bold">Tomorrow's Weather</h3>
            <p className="text-lg">{Math.round(tomorrowWeather.main.temp)}°C</p>
            <p className="text-sm">{tomorrowWeather.weather[0].description}</p>
          </div>
        )}

        {hourlyForecast.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Hourly Forecast</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {hourlyForecast.map((hour, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl text-center text-sm hover:bg-gray-100 transition duration-300"
                >
                  <p className="font-semibold mb-1">{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt="icon"
                    className="w-10 mx-auto"
                  />
                  <p className="mt-1 font-bold">{Math.round(hour.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
