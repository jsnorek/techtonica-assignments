import { useEffect, useState } from "react";

//position here refers to the position of the ship
function Asteroid({position, setScore}) {
  console.log("tester");
  //asteroid holds the "set" position of the asteroid
  //useState is creating the default position of asteroid
  const [asteroid, setAsteroid] = useState({ x: generator(500), y: generator(700) });
  //create a random number using max boundary as a way to randomly position asteroids
  function generator(maxBoundary) {
    const randomNum = Math.floor(Math.random() * (maxBoundary + 1));
    return randomNum;
  }
  //let interval;
  //sets the timed interval for asteroids to drop down the screen
  useEffect(() => {
  const interval = setInterval(() => {
    console.log(asteroid.y);
    console.log(window.innerHeight);
    // if(asteroid.y >= window.innerHeight - 50) {
    //     console.log("passed window");
    //      clearInterval(interval);
    //      return
    //} else {
    setAsteroid((prev) => {
      //compare ship and asteroid positions, if they are equal then game over
      const shipY = window.innerHeight - 50;
      if(prev.y >= window.innerHeight - 50) {
        console.log("passed window");
        clearInterval(interval);
      }
      //compare asteroid Y positioning to shipY and asteroid.x to position (which is ship x position)
      //instead of === it has to be either a <= or >=
      if(prev.y >= shipY && (prev.x >= position + 50 || prev.x < position - 50)) {
        console.log("game over");
      }
      return {
        ...prev,
        y: prev.y + 10
      }
    }) //}
  }, 1000)
  }, [])

  return (<div className="asteriods" style={{ top: `${asteroid.y}px`, left: `${asteroid.x}px` }}>
    asteroid
  </div> );
}

export default Asteroid;