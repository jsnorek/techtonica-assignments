// eslint-disable-next-line react/prop-types
const SpeciesList = ({ speciesList }) => {

    return (
        <div className="speciesList">
            <h2>Tracked Species</h2>
            <ul>
                {/* for each species object in the array it returns a list item <li>. key must be unique identifier for react to track items*/}
                {speciesList.map(species => (
                    <li key={species.id}>{species.common_name} - {species.scientific_name} - {species.estimated_population} - {species.conservation_status}</li>
                ))}
            </ul>
        </div>
    )
}

export default SpeciesList;