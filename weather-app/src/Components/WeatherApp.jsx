import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import React, { useState } from 'react'


const WeatherApp = () => {
    const [data, setDate] = useState({})
    //update based on location
    const [location, setLocation] = useState('')
    const api_key = 'a5a488ba5a8f0bdad071811c3c9f4e06'

    //function to grab user entry into search bar
    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

   
const search = async () => {
     //add &units=Imperiall to change to Fahrenheit
    const url = `http://pro.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&APPID=${api_key}`
    //need to fetch     
    const res = await fetch(url)
    //convert response into json
    const searchData = res.json()
    //check to see if data is fetched on search click
    console.log(searchData)
    setDate(searchData)
    //change setstate of location
    setLocation('')
}

  return (
    <div className="container">
        <div className="weather-app">
            <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">San Francisco</div>
                    </div>
                <div className="search-bar">
                    {/* set value for location to what user inputs and use handleInputChange to set the change location setstate upon user input */}
                    <input type="text" placeholder='Enter Location' value={location} onChange={handleInputChange}/>
                    {/* add onclick for the search to work */}
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            <div className="weather">
                <img src={ sunny } alt="sunny" />
                <div className="weather-type">Clear</div>
                <div className="temp">28°</div>
            </div>
            <div className="weather-date">
                <p>Mon, 26 Aug</p>
            </div>
            <div className="weather-data">
                <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">45%</div>
                </div>
                <div className="wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">4mph</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp