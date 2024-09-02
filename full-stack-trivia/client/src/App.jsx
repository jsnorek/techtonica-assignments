import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questionData, setQuestionData] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerCount, setAnswerCount] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/questions", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { results } = await res.json();
        setQuestionData(results);
        setQuestion(results[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (gameOver) {
      return;
    }

    setAnswerCount((prevCount) => {
      return prevCount + 1
    })
    //change user input and database "correct answer" to lowercase to they're always matching despite any capital or lowercase letters
    const correctAnswer = question.correct_answer.toLowerCase();
    const userAnswer = answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      setRightAnswer((prevCount) => {
        return prevCount + 1
      })
    } else {
      setWrongAnswer((prevCount) => {
        return prevCount + 1
      })
    }
    
    console.log(answerCount, "answer count")

    if (questionData.length > answerCount + 1) {
      const newQuestion = questionData[answerCount + 1];
      setQuestion(newQuestion);
    } else {
      setGameOver(true);
      window.alert("game over")
    }
  };

  // console.log("test", questionData);
  // console.log(answerCount, "count")
  console.log("right", rightAnswer, "wrong", wrongAnswer);
  return (
    <div>
      <h1>Questions</h1>
      {question && <h3> {question.question}</h3>}
      <form onSubmit={onSubmit}>
        <input
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* {questionData ? (
          questionData.map((question, index) => (
            <div key={index}>
              <p>Category: {question.category}</p>
              <p>Question: {question.question}</p>
              <p>Correct Answer: {question.correct_answer}</p>
              <p>Incorrect Answers: {question.incorrect_answers.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )} */}
    </div>
  );
}

export default App;
