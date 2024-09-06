import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questionData, setQuestionData] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answerCount, setAnswerCount] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winLoseMessage, setWinLoseMessage] = useState('');

  //to fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/questions", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const {results} = await res.json();
        console.log(results)
        setQuestionData(results);
        setQuestion(results[0]); //set the first question in the data object
      } catch (err) {
        console.error(err);
      }
    };
    fetchData()
  },[]) //if no dependencies the effect will run after every render

  //to set message if gameover
  useEffect(() => {
      if (gameOver) {
        // window.alert(`game over! you got ${rightAnswer} question(s) right and ${wrongAnswer} wrong.`)
        if (rightAnswer > wrongAnswer) {
          setWinLoseMessage("You win!");
        } else if (wrongAnswer > rightAnswer) {
          setWinLoseMessage("You lose!");
        } else {
          setWinLoseMessage("Too close to say!")
        }
      }
  }, [answerCount, rightAnswer, wrongAnswer, gameOver]); //dependencies set so the effect will only re-run if any of the dependencies change

 

  const handleAnswerSubmit = (userAnswer) => {
    if (gameOver) {
      return;
    }

    setAnswerCount((prevCount) => prevCount + 1);

    const correctAnswer = question.correct_answer.toLowerCase();
    if (userAnswer.toLowerCase() === correctAnswer) {
      setRightAnswer((prevCount) => prevCount + 1);
    } else {
      setWrongAnswer((prevCount) => prevCount + 1);
    }

    if (questionData.length > answerCount) {
      const newQuestion = questionData[answerCount + 1];
      setQuestion(newQuestion);
    }

    if (answerCount === 4) {
      setGameOver(true);
    }
  };

  return (
    <div className="gameDisplay">
      <h1>Questions</h1>
      <h3>True or False?</h3>
      {question && <h3>{question.question}</h3>}
      <AnswerInput handleAnswerSubmit={handleAnswerSubmit} />
      <div className="counts">
        <p>Right: {rightAnswer}</p>
        <p>Wrong: {wrongAnswer}</p>
        <p>Total Responses: {answerCount}</p>
        <p className="message">{winLoseMessage}</p>
      </div>
    </div>
  );
}

function AnswerInput({ handleAnswerSubmit }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAnswerSubmit(answer);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}> 
      <input
        name="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
