import { useEffect } from "react";

function ErrorMessage({ errorType, setErrorMessageVisible }) {
    // define all error codes
    const badRequest = '400';
    const unauthorized = '401';
    const notFound = '404';
    const tooManyRequests = '429';  

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
      case badRequest:
        return "Bad Request. Check your information and try again.";
      case tooManyRequests:
        return "API limit exceeded. Please wait and try again or extend your API key quota";
      default:
        return "Failed to get weather data";
    }
  };

  return <div>{getErrorMessage()}</div>;
}

export default ErrorMessage;
