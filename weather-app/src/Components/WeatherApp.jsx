import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import React, { useState, useEffect } from 'react'

const WeatherApp = () => {
    const [data, setData] = useState({})
    //update based on location
    const [location, setLocation] = useState('')
    const api_key = ''

    //to put in a default location upon loading browser
useEffect(() => {
    const fetchDefaultWeather = async () => {
        const defaultLocation = "Sonoma"
        const url = `http://pro.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Imperial&APPID=${api_key}`
        const res = await fetch(url)
        const defaultData = await res.json()
        setData(defaultData)
    }
    fetchDefaultWeather()
//if a state is in the empty array the function will run every time that state changes. if empty, 
//it will only run once after intializing
}, [])

    //function to grab user entry into search bar
    const handleInputChange = (e) => {
        //to update state of location - links to line 56 for location update
        setLocation(e.target.value)
    }

    //create new variable to change the weather images depending on the weather data
    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy, 
        Haze: cloudy,
        Mist: cloudy
    }
    //to change image depending on pulled weather data from api
    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;

    const backgroundImages = {
        Clear: 'linear-gradient(to top, purple, orange)',
        Clouds: 'linear-gradient(to top, rgb(101, 70, 101), rgb(35, 16, 70));',
        Rain: 'linear-gradient(to top, purple, orange);'
    }
   
const search = async () => {
    //to prevent error when search bar is executed while being empty
    if(location.trim() !== "") 
    {
         //add &units=Imperiall to change to Fahrenheit
     const url = `http://pro.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&APPID=${api_key}`;
     //const url = `http://pro.openweathermap.org/data/2.5/weather?q=London,uk&units=Imperial&APPID=a5a488ba5a8f0bdad071811c3c9f4e06`;
      //need to fetch     
     const res = await fetch(url);
     //convert response into json
     const searchData = await res.json();
     //check to see if data is fetched on search click
     console.log(searchData)
     setData(searchData)
     //change setstate of location
     setLocation('')
    }
}

//to run the search function and pull data when the "enter" button is clicked 
const handleKeyDown = (e) => {
    //if true, call the search function
    if(e.key === "Enter") {
        search()
    }
}

  return (
    <div className="container">
        <div className="weather-app">
            <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        {/* updates the city name to whatever is entered in the search bar using state */}
                        <div className="location">{data.name}</div>
                    </div>
                <div className="search-bar">
                    {/* set value for location to what user inputs and use handleInputChange to set the change location setstate upon user input */}
                    <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    {/* add onclick for the search to work */}
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            <div className="weather">
                <img src={ weatherImage } alt="weather" />
                {/* data object initially contains an empty object as its default value so when you 
                try to access data on reload it's trying to access an empty object so it comes out undefined and throws an error.
                so you need to ensure data temp, weather type, humidity exists before accessing*/}
                <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                {/* <div className="temp">{Math.floor(data.main.temp)}°</div> */}
            </div>
            <div className="weather-date">
                <p>Mon, 26 Aug</p>
            </div>
            <div className="weather-data">
                <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{data.main ? data.main.humidity : null}</div>
                </div>
                <div className="wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{data.wind ? `${Math.floor(data.wind.speed)}` : null}mph</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp