import React, { useState } from "react";

//pulls useState from App
export default function Counter({score, setScore}) {
    // shows count = 0 //count starting at 0
     
      //increment function to add points and reset score
      const incrementCounter = () => {
        setScore(score + 100);
      }

      const resetCounter = () => {
        setScore(0);
      }
      
      return (
        <div className="counter">
          {/*count is the state here*/}
          <p>Score: {score}</p>
          <button onClick={incrementCounter}>+</button>
          <button onClick={resetCounter}>reset</button>
        </div>
      );
    }