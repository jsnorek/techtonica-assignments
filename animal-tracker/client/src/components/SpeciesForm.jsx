import React from "react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SpeciesForm = ({ addNewSpecies }) => {
    console.log('rendering species form...');
    //state to track new species
    const [species, setSpecies] = useState({
        common_name: "",
        scientific_name: "",
        estimated_population: "",
        conservation_status: ""
    });
    //function to handle POST request and update list
    const postSpecies = async (newSpecies) => {
        const response = await fetch("http://localhost:8080/api/species", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSpecies)
        });
        const data = await response.json();
        console.log(data);
        addNewSpecies(data); //update species list
        clearForm(); //clear form after submission
    };
   //clear form
    const clearForm = () => {
        setSpecies({ 
            common_name: "", 
            scientific_name: "", 
            estimated_population: "", 
            conservation_status: ""
        });
    };
    //handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        postSpecies(species); //call postSpecies to submit form data
    };
    //handle form field changes
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSpecies((prevSpecies) => ({ ...prevSpecies, [name]: value }));
      };

    return (
        <form className="form_species" onSubmit={handleSubmit}>
            <input
                type="text"
                name="common_name"
                placeholder="Common Name"
                required
                value={species.common_name}
                onChange={handleChange} 
            />
            <input
                type="text"
                name="scientific_name"
                placeholder="Scientific Name"
                required
                value={species.scientific_name}
                onChange={handleChange}
            />
            <input
                type="number"
                name="estimated_population"
                placeholder="Estimated Population"
                required
                value={species.estimated_population}
                onChange={handleChange}
            />
            <input
                type="text"
                name="conservation_status"
                placeholder="Conservation Status"
                required
                value={species.conservation_status}
                onChange={handleChange}
            />
            <button type="submit">Save New Species</button>
        </form>
    )

};

export default SpeciesForm;

