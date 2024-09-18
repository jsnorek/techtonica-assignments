// import { useState, useEffect } from "react";
// import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SpeciesList = ({ speciesList }) => {
    // const [speciesList, setSpeciesList] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/species')
    //         .then(response => setSpeciesList(response.data))
    //         .catch(error => console.error(error));
    // }, []);




    return (
        <div className="speciesList">
            <h2>Tracked Species</h2>
            <ul>
                {speciesList.map(species => (
                    <li key={species.id}>{species.common_name} - {species.scientific_name} - {species.estimated_population} - {species.conservation_status}</li>
                ))}
            </ul>
        </div>
    )
}

export default SpeciesList;