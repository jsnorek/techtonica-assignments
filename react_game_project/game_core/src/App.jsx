import { useEffect, useState } from "react";
import Asteroid from "./Asteroid";
import Counter from "./Counter";


function App() {
  //ship position
  const [shipPosition, setShipPosition] = useState(0);
  const [asteroidPosition, setAsteroidPosition] = useState(0);
  //game score
  const [score, setScore] = useState(0);

  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      if (shipPosition >= 0) {
        setShipPosition((prev) => prev - 10);
      }
    } else if (e.key === "ArrowRight") {
      if (shipPosition <= 500) {
      setShipPosition((prev) => prev + 10);
      }
    }
  }
//useeffect is a callback that runs after the component renders and here, adds an event listener for "keydown" event that runs the handleKeyDown function
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="container">
      <Counter score={score} setScore={setScore} />
      <div className="ship" style={{ transform: `translateX(${shipPosition}px)` }}>
        ship
      </div>
      <Asteroid asteroidPosition={asteroidPosition} setScore={setScore}/>
      <Asteroid asteroidPosition={asteroidPosition} setScore={setScore}/>
    </div>
  );
}

export default App;
