import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [questionData, setQuestionData] = useState(null);

  // useEffect(() => {
  //   fetch('/api')
  //     .then(response => response.json())
  //     .then(data => setData(data.message));
  // }, []);



  // useEffect(() => {
    
  //     console.log('useEffect is triggered')
  //     fetch('http://localhost:5005/', {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         return res.json()})
  //       .then((data) => {
  //         console.log(data); 
  //         setQuestionData(data)})
  //       .catch((err) => console.log(err));
    
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/questions', {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const {results} = await res.json();
        setQuestionData(results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  

//   return (
//     <div>
//       {/* <h1>{data ? data : 'Loading...'}</h1> */}
//       <p>Questions</p>
//       {data ? (
//         <>
//           <p>{data.results}</p>
//         </>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }
console.log("test", questionData);
   return (
      <div>
        <p>Questions</p>
        {questionData ? (
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
        )}
      </div>
    );

}

export default App;