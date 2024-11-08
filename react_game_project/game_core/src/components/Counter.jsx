// to handle the score counter

export default function Counter({score, setScore}) {
     
      // Increment function to add points and reset score
      const incrementCounter = () => {
        setScore(score + 100);
      }

      // Function to reset the counter
      const resetCounter = () => {
        setScore(0);
      }
      
      return (
        <div className="counter">
          <p>Score: {score}</p>
          <button onClick={incrementCounter}>+</button>
          <button onClick={resetCounter}>reset</button>
        </div>
      );
    };