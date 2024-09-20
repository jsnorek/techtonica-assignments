import { useState } from "react";

const IndividualsForm = () => {
    //usestate for individuals
    const [individuals, setindividuals] = useState({
        nickname: "",
        species_id: ""
    });
    //POST request for individuals
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

    //clear the form 
    const clearForm = () => {
        setindividuals({
            nickname: "",
            species_id: ""
        });
    };
    //handlesubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        postindividuals(individuals);
    };
    //handle form field change
    const handleChange = (e) => {
        const {name, value} = e.target;
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