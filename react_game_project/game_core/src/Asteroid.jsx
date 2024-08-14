import { useEffect, useState } from "react";

//position here refers to the position of the ship
function Asteroid({position}) {

    //asteroid holds the "set" position of the asteroid
    //useState is creating the default position of asteroid
    const [asteroid, setAsteroid] = useState({ x: generator(500), y: generator(700) });
    //create a random number using max boundary as a way to randomly position asteroids
  function generator(maxBoundary) {
    const randomNum = Math.floor(Math.random() * (maxBoundary + 1));
    return randomNum;
  }
  //sets the timed interval for asteroids to drop down the screen
  useEffect(() => {
    const interval = setInterval(() => {
        console.log(asteroid.y);
        console.log(window.innerHeight);
        if(asteroid.y >= window.innerHeight) {
            console.log("passed window");
            return clearInterval(interval); 
        } 
      setAsteroid((prev) => {
        //compare ship and asteroid positions, if they are equal then game over
        const shipY = 500;

        //compare asteroid Y positioning to shipY and asteroid.x to position (which is ship x position)
        //instead of === it has to be either a <= or >=
        // if(prev.y >= shipY)// && asteroid.x == position) {
        //    //{ console.log("game over");
        // }
        return {
          ...prev,
          y: prev.y + 10
        }
      })
    }, 1000)
  }, [asteroid])
    return (<div className="asteriods" style={{ top: `${asteroid.y}px`, left: `${asteroid.x}px` }}>
        asteroid
      </div> );
}

export default Asteroid;