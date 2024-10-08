import React from "react";
import { useState } from "react"

const SightingsForm = ({ addNewSighting }) => {
    //usestate for sightings
    const [sightings, setSightings] = useState({
        sighting_time: "",
        individual_id: "",
        location: "",
        healthy: "",
        sighter_email: ""
    });
    //POST request for sightings
    const postSightings = async (newSighting) => {
        const response = await fetch("http://localhost:8080/api/sightings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSighting)
        });
        const data = await response.json();
        console.log(data);
        addNewSighting(data);
        clearForm();
    };
    //clear form
    const clearForm = () => {
        setSightings({
            sighting_time: "",
            individual_id: "",
            location: "",
            healthy: "",
            sighter_email: ""
        });
    };
    //handlesubmit
   const handleSubmit = (e) => {
    e.preventDefault();
    postSightings(sightings);
   };
   //handle form field change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSightings((prevSightings) => ({...prevSightings, [name]: value }));
    };
    //handle form checkbox change
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSightings((prevSightings) => ({...prevSightings, [name]: checked }));
    };
    
    return (
        <form className="form_sightings" onSubmit={handleSubmit}>
            <label>
                <input
                type="datetime-local"
                name="sighting_time"
                required
                value={sightings.sighting_time}
                onChange={handleChange}
                />
                Date & Time of Sighting
            </label>
            <input
            type="number"
            name="individual_id"
            placeholder="Individual ID"
            required
            value={sightings.individual_id}
            onChange={handleChange}
            />
            <input
            type="text"
            name="location"
            placeholder="Location"
            required
            value={sightings.location}
            onChange={handleChange}
            />
            <label>
                <input
                type="checkbox"
                name="healthy"
                required
                value={sightings.healthy}
                onChange={handleCheckboxChange}
                />
                Healthy?
            </label>
            <input
            type="email"
            name="sighter_email"
            placeholder="Email"
            required
            value={sightings.sighter_email}
            onChange={handleChange}
            />
            <button type="submit">Save New Sighting</button>
        </form>
    );

};

export default SightingsForm;