// import React, { useState, useEffect } from "react";
// import * as ioicons from "react-icons/io5";
// import MyForm from "./Form";
// import Student from "./Student";

// const ListEvents = () => {
//   // this is my original state with an array of students
//   const [events, setEvents] = useState([]);

//   //this is the state needed for the UpdateRequest
//   const [editingEvents, setEditingEvents] = useState(null);

//   const loadEvents = () => {
//     // A function to fetch the list of events that will be load anytime that list change
//     fetch("http://localhost:8080/api/events")
//       .then((response) => response.json())
//       .then((events) => {
//         setEvents(events);
//       });
//   };

//   useEffect(() => {
//     loadEvents();
//   }, [events]);

//   const onSaveEvent = (newEvent) => {
//     //console.log(newEvent, "From the parent - List of events");
//     setEvents((events) => [...events, newEvent]);
//   };

//   //A function to control the update in the parent (student component)
//   const updateEvent = (savedEvents) => {
//     // console.log("Line 29 savedStudent", savedStudent);
//     // This function should update the whole list of students -
//     loadEvents();
//   };

//   //A function to handle the Delete funtionality
//   const onDelete = (event) => {
//     //console.log(student, "delete method")
//     return fetch(`http://localhost:8080/api/students/${event.id}`, {
//       method: "DELETE"
//     }).then((response) => {
//       //console.log(response);
//       if (response.ok) {
//         loadEvents();
//       }
//     });
//   };

//   //A function to handle the Update functionality
//   const onUpdate = (toUpdateEvent) => {
//     //console.log(toUpdateStudent);
//     setEditingEvents(toUpdateEvent);
//   };

//   return (
//     <div className="mybody">
//       <div className="list-students">
//         <h2>Techtonica Participants </h2>
//         <ul>
//           {events.map((event) => {
//             return (
//               <li key={event.id}>
//                 {" "}
//                 <Event
//                   events={events}
//                   toDelete={onDelete}
//                   toUpdate={onUpdate}
//                 />
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//       <MyForm
//         key={editingEvents ? editingEvents.id : null}
//         onSaveStudent={onSaveEvent}
//         editingStudent={editingEvents}
//         onUpdateStudent={updateEvent}
//       />
//     </div>
//   );
// };

// export default ListEvents;