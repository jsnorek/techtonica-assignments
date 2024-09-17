// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpeciesList from './components/SpeciesList';
import SightingsList from './components/SightingsList';
import SpeciesForm from './components/SpeciesForm';
import IndividualsForm from './components/IndividualsForm';

function App() {
    const [speciesList, setSpeciesList] = useState([]);

    //fetch species data
    useEffect(() => {
        axios.get('/api/species')
            .then(response => setSpeciesList(response.data))
            .catch(error => console.error(error));
    }, []);
    //function to add new species to the list
    const addNewSpecies = (newSpecies) => {
      console.log("Adding new species to the list: ", newSpecies);
      setSpeciesList((prevList) => [...prevList, newSpecies])
      console.log(speciesList);
    };


    return (
        <div>
            <h1>Animal Tracker</h1>
            {/* <ul>
                {speciesList.map(species => (
                    <li key={species.id}>{species.common_name} - {species.scientific_name} - {species.estimated_population} - {species.conservation_status}</li>
                ))}
            </ul> */}
            <SpeciesList speciesList={speciesList}/>
            <SightingsList />
            <SpeciesForm addNewSpecies={addNewSpecies}/>
            <IndividualsForm />
        </div>
    );
}

export default App;