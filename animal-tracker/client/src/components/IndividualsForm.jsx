import React, { useState, useEffect } from "react";

const IndividualsForm = () => {

    const [individuals, setindividuals] = useState({
        nickname: "",
        species_id: ""
    });

    const postindividuals = async (newIndividuals) => {
        const response = await fetch("http://localhost:8080/api/individuals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newIndividuals)
        });
        const data = await response.json();
        console.log(data);
        // onSaveIndividuals(data);
        clearForm();
    };


    const clearForm = () => {
        setindividuals({
            nickname: "",
            species_id: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postindividuals(individuals);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setindividuals((prevIndividuals) => ({...prevIndividuals, [name]: value }));
    };

    return (
        <form className="form_individuals" onSubmit={handleSubmit}>
            <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                required
                value={individuals.nickname}
                onChange={handleChange}
            />
            <input
                type="text"
                name="species_id"
                placeholder="Species ID"
                required
                value={individuals.species_id}
                onChange={handleChange}
            />
            <button type="submit">Save New Individual</button>
        </form>
    )
};

export default IndividualsForm;