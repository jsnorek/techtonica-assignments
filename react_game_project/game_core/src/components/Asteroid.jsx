// Handles the asteroid and ship rendering and movement on the screen
import { useEffect, useState } from "react";

// Position here refers to the position of the ship. both position and setScore are pulled from App
function Asteroid({position, setScore}) {


  // Creating the default position of asteroid
  const [asteroid, setAsteroid] = useState({ x: generator(500), y: generator(700)});
  // Handles end of game
  const [gameOver, setGameOver] = useState(0);
  // Create a random number using max boundary as a way to randomly position asteroids
  function generator(maxBoundary) {
    const randomNum = Math.floor(Math.random() * (maxBoundary + 1));
    return randomNum;
  }
  
  
  // Checking if the asteroid is hitting the ship position
  useEffect(() => {
    // End of the browser window
    const shipY = window.innerHeight - 50;
    // Checking if asteroid reaches bottom of browser window, the rest is checking the position of the asteroid and if they've collided
    if(asteroid.y >= shipY && (asteroid.x <= position + 50 && asteroid.x >= position - 50)) {
      console.log("game over");
      // If asteroid hits ship from line 24, then gameOver state equals 1 and setScore changes to add 100 to score
      if(gameOver === 0) {
      setScore((prev) => {
        return prev += 100;
      });}
    }
  }, [asteroid, position, setScore])
  
  // This useEffect moves the asteroid and stops movement if it hits the bottom of screen
  useEffect(() => {
  const interval = setInterval(() => {
    console.log(asteroid.y);
    console.log(window.innerHeight);
   // Checks if gameOver is still 0 after each asteroid movement, holds the same score
    if (gameOver === 0) {
    setAsteroid((prev) => {
      
      // This stops interval when asteroid hits the bottom of the window
      if(prev.y >= window.innerHeight - 50) {
        console.log("passed window");
        clearInterval(interval);
        // Sets gameover to 1 so it stops all above functions that rely on gameOver === 0, esentially stopping the game
        setGameOver(1);
        // Stops asteroid movement
        return {
          ...prev,
          y: prev.y
        }
      }
      // Moves asteroid down the y axis in increments of 10  
      return {
        ...prev,
        y: prev.y + 20
      }
    }) }
  }, 1000)
  }, [])
  // Setting asteroid to a random position using inline styling
  return (<div className="asteriods" style={{ top: `${asteroid.y}px`, left: `${asteroid.x}px` }}>
    asteroid
  </div> );
}

export default Asteroid;