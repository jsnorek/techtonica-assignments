import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpeciesList from './components/SpeciesList';
import SightingsList from './components/SightingsList';
import SpeciesForm from './components/SpeciesForm';
import IndividualsForm from './components/IndividualsForm';
import SightingsForm from './components/SightingsForm';

function App() {
    const [speciesList, setSpeciesList] = useState([]);
    const [sightingsList, setSightingsList] = useState([]);

    //fetch species data
    useEffect(() => {
        axios.get('/api/species')
            .then(response => setSpeciesList(response.data))
            .catch(error => console.error(error));
        axios.get('/api/sightings')
            .then(response => setSightingsList(response.data))
            .catch(error => console.log(error));
    }, []);
    //function to add new species to the list
    const addNewSpecies = (newSpecies) => {
      console.log("Adding new species to the list: ", newSpecies);
      setSpeciesList((prevList) => [...prevList, newSpecies])
      console.log(speciesList);
    };
    //function to add new sightings to the lsit
    const addNewSighting = (newSighting) => {
      console.log("Adding new sighting to the list: ", newSighting);
      setSightingsList((prevList) => [...prevList, newSighting])
      console.log(sightingsList)
    };
  
    return (
        <div>
            <h1>Animal Tracker</h1>
            <SpeciesList speciesList={speciesList}/>
            <SightingsList sightingsList={sightingsList}/>
            <SpeciesForm addNewSpecies={addNewSpecies}/>
            <IndividualsForm />
            <SightingsForm addNewSighting={addNewSighting}/>
        </div>
    );
}

export default App;