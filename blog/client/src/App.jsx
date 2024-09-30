import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { PrimeReactProvider } from 'primereact/api';
import Review from './components/Review';
import ListReviews from './components/ListReviews';
import GameDetailsModal from './components/GameDetailsModal';

function App() {

  const [reviews, setReviews] = useState([]);
  const [gameDetailsVisible, setGameDetailsVisible] = useState(false);
  const [gameDetails, setGameDetails] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
 
  useEffect(() => {
    axios.get('http://localhost:8080/reviews')
    .then(response => setReviews(response.data))
    .catch(error => console.error(error));
  }, []);
  console.log('reviews', reviews);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (selectedGameId) {
        console.log('Fetching details for game id:', selectedGameId);
        try {
          const response = await axios.get(`http://localhost:8080/game-details/${selectedGameId}`);
          console.log('game details fetched:', response.data);
          setGameDetails(response.data);
        } catch (error) {
          console.error('error fetching game details:', error);
        }
      }
    };
    fetchGameDetails();
  }, [selectedGameId])

  const handleGameDetailsVisible = (gameId) => {
    setSelectedGameId(gameId);
    setGameDetailsVisible(true);
    console.log('game details', gameId);
  };

  return (
    <PrimeReactProvider>
     <div className='reviews-container'>
        <h1>Community Game Review Blog</h1>
        <ListReviews reviews={reviews} setGameDetailsVisible={setGameDetailsVisible} onClickHandleGameDetailsVisible={handleGameDetailsVisible}/>
        {gameDetailsVisible &&
        <GameDetailsModal setGameDetailsVisible={setGameDetailsVisible} gameDetails={gameDetails}/>}
     </div>
    </PrimeReactProvider>
  )
}

export default App;
