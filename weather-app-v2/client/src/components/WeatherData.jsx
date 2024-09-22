import React, { useState } from "react";

function WeatherData({ weatherData }) {

    return (
        <div className="weather-data">
            {weatherData ? (
                <>
                <h2>{weatherData.name}</h2>
                <p>{Math.floor(weatherData.main.temp)}°F</p>
                </>
            ) : (
                <p>loading weather data...</p>
            )}
        </div>
    )
}

export default WeatherData;