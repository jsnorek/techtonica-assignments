import { useEffect, useState } from "react";
import Asteroid from "./components/Asteroid";
import Counter from "./components/Counter";


function App() {
  //ship position
  const [position, setPosition] = useState(0);
  //game score
  const [score, setScore] = useState(0);

  // Handles moving ship when user presses left or right arrow keys
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
// On render, adds an event listener for "keydown" event that runs the handleKeyDown function
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="container">
      <Counter score={score} setScore={setScore} />
      <div className="ship" style={{ transform: `translateX(${position}px)` }}>
        ship
      </div>
      <Asteroid position={position} setScore={setScore}/>
      <Asteroid position={position} setScore={setScore}/>
    </div>
  );
}

export default App;
