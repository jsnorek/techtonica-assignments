// import { useState } from 'react';

// function Form({ addEvent }) {
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [eventtime, setEventtime] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newEvent = { title, location, eventtime };

//     try {
//       const response = await fetch('http://localhost:8080/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEvent),
//       });

//       if (response.ok) {
//         const addedEvent = await response.json();
//         addEvent(addedEvent);
//       } else {
//         console.error('Failed to add event');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }

//     setTitle('');
//     setLocation('');
//     setEventtime('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Title:</label>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//       </div>
//       <div>
//         <label>Location:</label>
//         <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
//       </div>
//       <div>
//         <label>Date:</label>
//         <input type="text" value={eventtime} onChange={(e) => setEventtime(e.target.value)} required />
//       </div>
//       <button type="submit">Add Event</button>
//     </form>
//   );
// }

// export default Form;

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const MyForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {
  // This is the original State with not initial event
  const [event, setEvent] = useState(
    editingEvent || {
      title: "",
      location: "",
      eventtime: ""
    }
  );

  //create functions that handle the event of the user typing into the form
  const handleEventChange = (event) => {
    const title = event.target.value;
    setEvent((event) => ({ ...event, title }));
  };

  const handlelocationChange = (event) => {
    const location = event.target.value;
    setEvent((event) => ({ ...event, location }));
  };

  const handleEventtimeChange = (event) => {
    const eventtime = event.target.value;
    //console.log(iscurrent);
    setEvent((event) => ({ ...event, eventtime }));
  };

  const clearForm = () => {
    setEvent({ title: "", location: "", eventtime: "" });
  };

  //A function to handle the post request
  const postEvent = (newEvent) => {
    return fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of events (the parent) for updating the list
        onSaveEvent(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the post request
  const putEvent = (toEditEvent) => {
    return fetch(`http://localhost:8080/api/events/:eventId"`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditEvent)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateEvent(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.id) {
      putEvent(event);
    } else {
      postEvent(event);
    }
  };

  return (
    <Form className="form-events" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <input
          type="text"
          id="add-event-title"
          placeholder="Title"
          required
          value={event.title}
          onChange={handleEventChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <input
          type="text"
          id="add-event-location"
          placeholder="Location"
          required
          value={event.location}
          onChange={handlelocationChange}
        />
      </Form.Group>
      <Form.Group>
      <Form.Label>Date</Form.Label>
        <input
        type={"date"}
        id={`add-event-date`}
        value={event.eventtime}
        onChange={handleEventtimeChange}
        label={`What is the date of the event?`}
        />
        </Form.Group>
      <Form.Group>
        <Button type="submit" variant="outline-success">
          {event.id ? "Edit event" : "Add event"}
        </Button>
        {event.id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  );
};

export default MyForm;