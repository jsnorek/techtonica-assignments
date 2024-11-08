import { useEffect, useState } from "react";
import Asteroid from "./components/Asteroid";
import Counter from "./components/Counter";


function App() {
  //ship position
  const [position, setPosition] = useState(0);
  //game score
  const [score, setScore] = useState(0);

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
      <div className="ship" style={{ transform: `translateX(${position}px)` }}>
        ship
      </div>
      <Asteroid position={position} setScore={setScore}/>
      <Asteroid position={position} setScore={setScore}/>
    </div>
  );
}

export default App;
