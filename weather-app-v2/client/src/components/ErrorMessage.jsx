import { useEffect } from "react";

function ErrorMessage({ errorType, setErrorMessageVisible }) {
    const unauthorized = 401;
    const notFound = 404;
  // define the other error codes

  useEffect(() => {
    setTimeout(() => {
        setErrorMessageVisible(false);
    }, 3000);
  }, []);

  const getErrorMessage = () => {
    switch (errorType) {
      case notFound:
        return "City not found. Please use a valid city";
      case unauthorized: 
        return "Error with API. Please check your API key";
      default:
        return "Failed to get weather data";
    }
  };

  return <div>{getErrorMessage()}</div>;
}

export default ErrorMessage;
