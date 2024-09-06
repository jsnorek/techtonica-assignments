import { useEffect, useState } from "react";

//position here refers to the position of the ship. both position and setScore are pulled from App
function Asteroid({shipPosition, setScore}) {
  //console.log("tester");
  const [visible, setVisible] = useState(true);

  //asteroid holds the "set" position of the asteroid
  //useState is creating the default position of asteroid
  const [asteroid, setAsteroid] = useState({ x: generator(500), y: generator(700)});
  const [gameOver, setGameOver] = useState(false);
  //create a random number using max boundary as a way to randomly position asteroids
  function generator(maxBoundary) {
    const randomNum = Math.floor(Math.random() * (maxBoundary + 1));
    return randomNum;
  }
  
  //sets the timed interval for asteroids to drop down the screen
  
  //this useEffect is checking if the asteroid is hitting the ship position
  useEffect(() => {
    //end of the browser window
    const shipY = window.innerHeight - 50;
    //checking if asteroid reaches bottom of browser window, the rest is checking the position of the asteroid and if they've collided
    if(asteroid.y >= shipY && (asteroid.x <= shipPosition + 50 && asteroid.x >= shipPosition - 50)) {
      console.log("game over");
      //if asteroid hits ship from line 24, then gameOver state equals 1 and setScore changes to add 100 to score
      if(gameOver == false) {
      setScore((prev) => {
        return prev += 100;
      });}
    }
    //useState variable/dependencies are added to the [] for recall ability
  }, [asteroid, shipPosition, setScore])
  
  //this useEffect moves the asteroid and stops movement if it hits the bottom of screen
  useEffect(() => {
  const interval = setInterval(() => {
    console.log(asteroid.y);
    console.log(window.innerHeight);
   //checks if gameOver is still 0 after each asteroid movement, holds the same score
    if (gameOver == false) {
    setAsteroid((prev) => {
      
      //this stops interval when asteroid hits the bottom of the window
      if(prev.y >= window.innerHeight - 50) {
        console.log("passed window");
        clearInterval(interval);
        //sets gameover to 1 so it stops all above functions that rely on gameOver === 0, esentially stopping the game
        setGameOver(true);
        //stops asteroid movement
        setVisible(false);
      }
      //moves asteroid down the y axis in increments of 10  
      return {
        ...prev,
        y: prev.y + 20
      }
    }) }
  }, 1000)
  }, [visible, gameOver]); //why do you need this dependency array?
  //setting asteroid to random position with style 
  
  if (!visible) {
    return null; // Stop rendering the asteroid if not visible
  }
  
  return (<div className="asteriods" style={{ top: `${asteroid.y}px`, left: `${asteroid.x}px` }}>
    asteroid
  </div> );
}

export default Asteroid;