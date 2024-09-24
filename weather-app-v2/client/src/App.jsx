import { useEffect, useState } from "react";
import "./App.css";
import UpdateFavoritesModal from "./components/UpdateFavoritesModal";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import WeatherData from "./components/WeatherData";
// import UsernameLogin from "./components/UsernameLogin";
import axios from 'axios';

// [x] hit weather API and store data
// [x] A DB that stores the user’s favorite city
// [x] A button to save the user’s favorite city
// [x] An update button to update the user’s favorite city
// [x] Error handling
// [x] show a user-visible error message to indicate what's wrong and how the user can fix it
// [x] HTML input attributes to validate input and make entering data fast and easy
// [x] A test file to test your component(s)

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Seattle");
  const [updateFavoritesVisible, setUpdateFavoritesVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorType, setErrorType] = useState("default")
  // const [userId, setUserId] = useState(null);
  const [userLogin, setUserLogin] = useState({
    user_id: "",
    username: "",
    favorite_city: ""
  });
  // const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const getWeatherData = async () => {
      const url = (`http://localhost:8080/location/${location}`);
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

  //test way to set up with a local storage database
  // const handleClickSaveFavorite = (favoriteLocation) => {
  //   window.localStorage.setItem("favorites", favoriteLocation);
  // };

  const handleClickSaveFavorite = async (favoriteLocation) => {
    if (!userLogin.user_id) {
      console.error("User not logged in. Please log in first.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/users/${userLogin.user_id}`, {
        username: userLogin.username,
        favorite_city: favoriteLocation
      });
      console.log("favorite city updated:", response.data);
      setUserLogin({
        ...userLogin,
        favorite_city: favoriteLocation
      });
    } catch (error) {
      console.error("error updating favorite city:", error);
    }
  };

  const handleClickUpdateFavorite = () => {
    // setUserId(id);
    setUpdateFavoritesVisible(true);
  };

  const handleUsernameInputChange = (e) => {
    setUserLogin({
      ...userLogin,
      username: e.target.value
    });
    console.log("username set to", userLogin);
};

  const handleClickUsernameInputChange = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/username/${userLogin.username}`);
      const user = response.data;
      setUserLogin({
        ...userLogin,
        user_id: user.user_id,
        favorite_city: user.favorite_city
      });
      console.log("userLogin", userLogin);
      console.log("User logged in:", user);
    } catch (error) {
      console.error("error fetching user:", error);
    }
};
//needed to update userLogin state from handleClickUsernameInputChange since it doesn't update it in time
useEffect(() => {
  // This will log every time userLogin is updated
  console.log("Updated userLogin state:", userLogin);
}, [userLogin]);


  console.log(weatherData, "app level")

  return (
    <div className="container">
      <div>Enter your username to save or update your favorite city</div>
      {/* <UsernameLogin userLogin={userLogin} setUserLogin={setUserLogin}/> */}
      <div className="username-login">
            <input
                type="text"
                name="username-login"
                placeholder="username"
                required
                onChange={handleUsernameInputChange}
                value={userLogin.username}
            />
            <button onClick={handleClickUsernameInputChange}>Enter</button>
      </div>
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
