import { useEffect, useState } from "react";
import Asteroid from "./Asteroid";
import Counter from "./Counter";


function App() {
  const [position, setPosition] = useState(0);
  //const [bulletPosition, setBulletPosition] = useState(0);
  const [score, setScore] = useState(0);
  // const [asteroid, setAsteroid] = useState({ x: generator(500), y: generator(700) });

  // function generator(maxBoundary) {
  //   const randomNum = Math.floor(Math.random() * (maxBoundary + 1));
  //   return randomNum;
  // }

  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      if (position >= 0) {
        setPosition((prev) => prev - 10);
      }
    } else if (e.key === "ArrowRight") {
      if (position <= 500) {
      setPosition((prev) => prev + 10);
      }
    }
  }
  
  //if ship position and asteroid position is the same, then score counter goes up, else stays 0
  // function addScore() {
  //   if(//asteroid blows up)
  //   setScore(previousScore => previousScore + 100)
  // }

  
  // addScore function will go here
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);




  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAsteroid((prev) => {
  //       return {
  //         ...prev,
  //         y: prev.y + 10
  //       }
  //     })
  //   }, 1000)
  // }, [])

  return (
    <div className="container">
      <Counter score={score} setScore={setScore} />
      <div className="ship" style={{ transform: `translateX(${position}px)` }}>
        ship
      </div>
      <Asteroid position={position} setScore={setScore}/>
      {/* <Asteroid /> */}
      {/* <div className="asteriods" style={{ top: `${asteroid.y}px`, left: `${asteroid.x}px` }}>
        asteroid
      </div> */}
    </div>
  );
}

export default App;
