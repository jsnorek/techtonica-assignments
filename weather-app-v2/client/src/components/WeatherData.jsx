import React, { useState } from "react";

function WeatherData({ weatherData }) {

    return (
        <div className="weather-data">
            {weatherData ? (
                <>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {Math.floor(weatherData.main.temp)}°F</p>
                <p>Feels Like: {Math.floor(weatherData.main.feels_like)}°F</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Pressure: {weatherData.main.pressure}inHg</p>
                <p>Wind Speed: {weatherData.wind.speed}mph</p>
                </>
            ) : (
                <p>loading weather data...</p>
            )}
        </div>
    )
}

export default WeatherData;