const SightingsList = ({ sightingsList }) => {

return (
    <div className='sightingsList'>
        <h2>Sightings List</h2>
        <ul>
            {/* for each sightings object in the array it returns a list item <li>. key must be unique identifier for react to track items*/}
            {sightingsList.map(sightings => (
                <li key={sightings.id}> {sightings.common_name} - {sightings.nickname} - {sightings.location} - {sightings.healthy ? ' ♥' : ' ♡'} - {sightings.sighting_time}</li>
            ))}
        </ul>
    </div>
    )
}

export default SightingsList;