

// import './App.css';
// import Events from './components/events';
// import Form from './components/Form';
// import MyNavBar from "./components/routes/Navbar";
// import { useState, useEffect } from 'react';

// function App() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/api/events')
//       .then((response) => response.json())
//       .then((data) => setEvents(data));
//   }, []);
//   // console.log('events', events);
  
//   const addEvent = (newEvent) => {
//     setEvents([...events, newEvent]);
//   };

//   return (
//     <div className="App">
//       <MyNavBar />
//       <h1>Techtonica 2023 H2 events</h1>
//       <Form addEvent={addEvent} />
//       <Events events={events} />
//     </div>
//   );
// }

// export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/routes/Navbar";
import ListEvents from "./components/ListEvents";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListEvents />
    </div>
  );
}

export default App;