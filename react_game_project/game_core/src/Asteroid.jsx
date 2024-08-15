import { useEffect, useState } from "react";

//position here refers to the position of the ship
function Asteroid({position, setScore}) {
  console.log("tester");
  //asteroid holds the "set" position of the asteroid
  //useState is creating the default position of asteroid
  const [asteroid, setAsteroid] = useState({ x: generator(500), y: generator(700)});
  const [gameOver, setGameOver] = useState(0);
  //create a random number using max boundary as a way to randomly position asteroids
  function generator(maxBoundary) {
    const randomNum = Math.floor(Math.random() * (maxBoundary + 1));
    return randomNum;
  }
  //let interval;
  //sets the timed interval for asteroids to drop down the screen
  
  //this useEffect is checking if the asteroid is hitting the ship position
  useEffect(() => {
    //end of the browser
    const shipY = window.innerHeight - 50;
    //checking if asteroid reaches bottom of browser window, the rest is checking the position of the asteroid and if they've collided
    if(asteroid.y >= shipY && (asteroid.x <= position + 50 && asteroid.x >= position - 50)) {
      console.log("game over");
      if(gameOver === 0) {
      setScore((prev) => {
        return prev += 100;
      });}
    }
    //useState variable/dependencies are added to the [] for recall
  }, [asteroid, position, setScore])
  
  //this useEffect moves the asteroid and stops movement if it hits the bottom of screen
  useEffect(() => {
  const interval = setInterval(() => {
    console.log(asteroid.y);
    console.log(window.innerHeight);
    // if(asteroid.y >= window.innerHeight - 50) {
    //     console.log("passed window");
    //      clearInterval(interval);
    //      return
    //} else {
    if (gameOver === 0) {
    setAsteroid((prev) => {
      
      //this stops interval when it hits the bottom of the window
      if(prev.y >= window.innerHeight - 50) {
        console.log("passed window");
        clearInterval(interval);
        setGameOver(1);
        return {
          ...prev,
          y: prev.y
        }
      }
      //compare asteroid Y positioning to shipY and asteroid.x to position (which is ship x position)
      //instead of === it has to be either a <= or >=
      //if(prev.y >= shipY && (prev.x >= position + 10 || prev.x < position - 10)) {
      //   if(asteroid.y >= shipY && (asteroid.x <= position + 50 && asteroid.x >= position - 50)) {
      //   console.log("game over");
      // }
      return {
        ...prev,
        y: prev.y + 10
      }
    }) }
  }, 1000)
  }, [])

  return (<div className="asteriods" style={{ top: `${asteroid.y}px`, left: `${asteroid.x}px` }}>
    asteroid
  </div> );
}

export default Asteroid;