import React, { useReducer, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const initialState = {
  title: "",
  location: "",
  eventtime: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_EVENTTIME":
      return { ...state, eventtime: action.payload };
    case "CLEAR_FORM":
      return initialState;
    case "SET_EVENT":
      return action.payload;
    default:
      return state;
  }
};

const MyForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {
    const [event, dispatch] = useReducer(reducer, editingEvent || initialState);

    const handleEventChange = (e) => {
        dispatch({ type: "SET_TITLE", payload: e.target.value });
    };

    const handlelocationChange = (e) => {
        dispatch({ type: "SET_LOCATION", payload: e.target.value });
    };

    const handleEventtimeChange = (e) => {
        dispatch({ type: "SET_EVENTTIME", payload: e.target.value });
    };

    const clearForm = () => {
        dispatch({ type: "CLEAR_FORM" });
    };

    const postEvent = (newEvent) => {
        return fetch("http://localhost:8080/api/events", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
        })
            .then((response) => response.json())
            .then((data) => {
                onSaveEvent(data);
                clearForm();
            });
    };

    const putEvent = (toEditEvent) => {
        return fetch(`http://localhost:8080/api/events/:eventId`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditEvent)
        })
            .then((response) => response.json())
            .then((data) => {
                onUpdateEvent(data);
                clearForm();
            });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (event.id) {
            putEvent(event);
        } else {
            postEvent(event);
        }
    };

    return(
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
                    type="date"
                    id="add-event-date"
                    value={event.eventtime}
                    onChange={handleEventtimeChange}
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