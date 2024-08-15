// import { useEffect, useState } from "react";

// const [score, setScore] = useState(0);



// function addScore() {
//     if(Asteroid.y) {
//     setScore(previousScore => previousScore + 100)
//     }
//   } 

//   export default Counter;

import React, { useState } from "react";


export default function Counter({score, setScore}) {
    // shows count = 0 //count starting at 0
     
      //increment function
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