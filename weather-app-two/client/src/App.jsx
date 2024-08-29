import { useEffect, useState } from 'react'
import './App.css'
// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  //event handler to handle location change
  const handleInputChange = (e) => {
    // console.log("handle input works")
    setLocation(e.target.value);
    // console.log({location});
  };

  //to run the search function and pull data when the "enter" button is clicked 
  const handleKeyDown = (e) => {
  //if true, call the search function
  console.log({location});
    if(e.key === "Enter") {
      search();
    }
  };
  const search = async () => {
    //to prevent error when search bar is executed while being empty
    if(location.trim())
    {
      const url = (`http://localhost:5003/location/${location}`)
      const res = await fetch(url);
      //server turns data to json format
      const searchData = await res.json();
      console.log("location updated")
      setWeatherData(searchData); //update weather state with data
    }
  }

  //useEffect is monitoring for new information coming in
  useEffect(() => {
    if (weatherData === null){
      console.log("useEffect is triggered")
      fetch('http://localhost:5003/', {
        headers: {
          "Content-Type": "application/json"
        }
      }) 
        .then(async (res) => {
          console.log(res); 
          return await res.json()}) //parse JSON data
        .then((data) => {console.log({data}); setWeatherData(data)})
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className='container'>
      <div className='weather-app'>
        <h2>Weather App</h2>
        {/* <h1>{weather}</h1> */}
        <div className='search'>
          <div className='search-top'>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div className='search-bar'>
            <input 
              id="searchBar"
              type="text" 
              placeholder='Enter location' 
              value={location} 
              onChange={handleInputChange} 
              onKeyDown={handleKeyDown}
            />
            <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
          </div>
          <div className='weather-stats'>
              {weatherData ? (
              <>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>{weatherData.weather.main}</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Feels like : {weatherData.main.feels_like}°C</p>
                <p>Humidity : {weatherData.main.humidity}%</p>
                <p>Pressure : {weatherData.main.pressure}</p>
                <p>Wind Speed : {weatherData.wind.speed}m/s</p>
              </>
              ) : (
                <p>Loading weather data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
