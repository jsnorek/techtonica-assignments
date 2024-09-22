import { useEffect, useState } from "react";
import "./App.css";
import UpdateFavoritesModal from "./components/UpdateFavoritesModal";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import WeatherData from "./components/WeatherData";

// [x] hit weather API and store data
// [~] A DB that stores the user’s favorite city
// [x] A button to save the user’s favorite city
// [x] An update button to update the user’s favorite city
// [x] Error handling
// [x] show a user-visible error message to indicate what's wrong and how the user can fix it
// [ ] HTML input attributes to validate input and make entering data fast and easy
// [ ] A test file to test your component(s)

const api_key = process.env.api_key;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Seattle");
  const [updateFavoritesVisible, setUpdateFavoritesVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorType, setErrorType] = useState("default")

  useEffect(() => {
    const getWeatherData = async () => {
      const url = `http://pro.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&APPID=${api_key}`;
      try {
        const rawData = await fetch(url);
        const locationData = await rawData.json();
        console.log("location updated", locationData);
        if (locationData.cod !== 200) {
          setErrorMessageVisible(true)
          setErrorType(locationData.cod)
        } else {
          setWeatherData(locationData);
        }
      } catch (e) {
        setErrorMessageVisible(true)
      }
    };
    getWeatherData();
  }, [location]);

  const handleClickSaveFavorite = (favoriteLocation) => {
    window.localStorage.setItem("favorites", favoriteLocation);
  };

  const handleClickUpdateFavorite = () => {
    setUpdateFavoritesVisible(true);
  };

  console.log(weatherData, "app level")

  return (
    <div className="container">
      <div>weather app v2</div>
      <SearchBar setLocation={setLocation}/>
      <button onClick={() => handleClickSaveFavorite(location)}>Save Favorite</button>
      <button onClick={handleClickUpdateFavorite}>Update Favorite City</button>

      {updateFavoritesVisible && (
        <UpdateFavoritesModal
          onSave={handleClickSaveFavorite}
          onCancel={() => setUpdateFavoritesVisible(false)}
        />
      )}

      {errorMessageVisible && <ErrorMessage errorType={errorType} setErrorMessageVisible={setErrorMessageVisible}/>}
      <WeatherData weatherData={weatherData}/>
    </div>
  );
}

export default App;
