import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Event from "./Event";

const ListEvents = ({searchString}) => {
  // this is my original state with an array of events
  const [events, setEvents] = useState([]);

  //this is the state needed for the UpdateRequest
  const [editingEvents, setEditingEvents] = useState(null);

  const loadEvents = async () => {
    console.log('loadEvents triggered');
    // A function to fetch the list of events that will be load anytime that list change
    await fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((events) => {
        setEvents(events);
      });
  };

  const filterEvents = () => {
    console.log('filterevents triggered')
    if(searchString != '') {
        const filteredEvent = events.filter(event => {
            // const lowerCaseSearch = searchString.toLowerCase();
            if(event.title.toLowerCase().includes(searchString.toLowerCase())) {
                return true;
            }
        });
        console.log({filteredEvent});
        setEvents(filteredEvent);
      }
  }

  useEffect(() => {
    console.log('useEffect triggered');
    if(events.length == 0 && searchString == '') {
        loadEvents();
    }
}, [events]);

    useEffect(() => {
        filterEvents();
    }, [searchString]);

  const onSaveEvent = (newEvent) => {
    //console.log(newEvent, "From the parent - List of events");
    setEvents((events) => [...events, newEvent]);
  };

  //A function to control the update in the parent (event component)
  const updateEvent = (savedEvent) => {
    // console.log("Line 29 savedEvent", savedEvent);
    // This function should update the whole list of events -
    loadEvents();
  };

  //A function to handle the Delete funtionality
  const onDelete = (event) => {
    //console.log(event, "delete method")
    return fetch(`http://localhost:8080/api/events/${event.id}`, {
      method: "DELETE"
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadEvents();
      }
    });
  };

  //A function to handle the Update functionality
  const onUpdate = (toUpdateEvent) => {
    //console.log(toUpdateEvent);
    setEditingEvents(toUpdateEvent);
  };
  

  return (
    <div className="mybody">
      <div className="list-events">
        <h2>Techtonica Events </h2>
        <ul>
          {events.map((event) => {
            return (
              <li key={event.id}>
                {" "}
                <Event
                  event={event}
                  toDelete={onDelete}
                  toUpdate={onUpdate}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <MyForm
        key={editingEvents ? editingEvents.id : null}
        onSaveEvent={onSaveEvent}
        editingEvents={editingEvents}
        onupdateEvent={updateEvent}
      />
    </div>
  );
};

export default ListEvents;