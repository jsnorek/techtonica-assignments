import { useState, useEffect, useReducer } from "react";
import EventCard from "./event";
import CardGroup from 'react-bootstrap/CardGroup';


function Events() {
    // const [events, setEvents] = useState([]);
    const [state, dispatch] = useReducer(reducer, []); //[] is initial state which is empty

    function reducer(state, action) {
      switch (action.type) {
        case 'setEvents':
          return action.payload
      }
    }

    const getRequest = () => {
      fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then(events => {
        dispatch({ type: 'setEvents', payload: events }) 
        console.log('Events fetched...', events);
        });
    }

    useEffect(() => {getRequest()}, []);

  return (
    <div>
    <CardGroup className="Events">
            {state.map(event =>
            <EventCard key={event.id} title={event.title} location={event.location} time={event.eventtime}/>
            )}
    </CardGroup>
    </div>
  );
}

export default Events;

// import { useState, useEffect, useReducer } from "react";
// import EventCard from "./event";
// import CardGroup from 'react-bootstrap/CardGroup';


// function Events() {
//     const [events, setEvents] = useState([]);
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const getRequest = () => {
//       fetch("http://localhost:8080/api/events")
//       .then((response) => response.json())
//       .then(events => {
//         setEvents(events); 
//         console.log('Events fetched...', events);
//         });
//     }

//     useEffect(() => {getRequest()}, []);

//   return (
//     <div>
//     <CardGroup className="Events">
//             {events.map(event =>
//             <EventCard key={event.id} title={event.title} location={event.location} time={event.eventtime}/>
//             )}
//     </CardGroup>
//     </div>
//   );
// }

// export default Events;