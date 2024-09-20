// import { useState, useEffect } from 'react';
// import axios from 'axios';

const SightingsList = ({ sightingsList }) => {
    // const [sightingsList, setsightingsList] = useState([]);

//     useEffect(() => {
//         axios.get('api/sightings')
//             .then(response => setsightingsList(response.data))
//             .catch(error => console.error(error));
//             console.log(sightingsList);
// }, []);

//working last
// const loadSightings = () => {
//     axios.get('api/sightings')
//         .then(response => setsightingsList(response.data))
//         .catch(error => console.error(error));
//         console.log(sightingsList);
// };

// useEffect(() => {
//     loadSightings();
//   }, []);

//   const onSaveSightings = (newSighting) => {
//     setsightingsList((sightings) => [...sightings, newSighting]);
//   };

//   const updateSightingsList = (savedSighting) => {
//     loadSightings();
//   };



return (
    <div className='sightingsList'>
        <h2>Sightings List</h2>
        <ul>
            {sightingsList.map(sightings => (
                <li key={sightings.id}> {sightings.common_name} - {sightings.nickname} - {sightings.location} - {sightings.healthy ? ' ♥' : ' ♡'} - {sightings.sighting_time}</li>
            ))}
        </ul>
    </div>
    )
}

export default SightingsList;