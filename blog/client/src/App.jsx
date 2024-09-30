import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { PrimeReactProvider } from 'primereact/api';
import Review from './components/Review';
import ListReviews from './components/ListReviews';
import GameDetailsModal from './components/GameDetailsModal';
import { Button } from 'primereact/button';
import CreateReview from './components/CreateReview';


function App() {

  const [reviews, setReviews] = useState([]);
  const [gameDetailsVisible, setGameDetailsVisible] = useState(false);
  const [gameDetails, setGameDetails] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [createReviewFormVisible, setCreateReviewFormVisible] = useState(false);
  const [allGames, setAllGames] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:8080/reviews')
    .then(response => setReviews(response.data))
    .catch(error => console.error(error));
  }, []);
  console.log('reviews', reviews);

  useEffect(() => {
    axios.get('http://localhost:8080/games')
    .then(response => setAllGames(response.data))
    .catch(error => console.error(error));
  }, []);
  console.log('all games info', allGames);

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

  const addNewReview = (newReview) => {
    console.log("Adding new review to the list: ", newReview);
    setReviews((prevList) => [...prevList, newReview])
    console.log(newReview);
  };

  const handleGameDetailsVisible = (gameId) => {
    setSelectedGameId(gameId);
    setGameDetailsVisible(true);
    console.log('game details', gameId);
  };

  const handleCreateReviewFormVisible = () => {
    setCreateReviewFormVisible(true);
  }

  return (
    <PrimeReactProvider>
     <div className='reviews-container'>
        <h1>Community Game Review Blog</h1>
        <Button label='Add New Review' onClick={handleCreateReviewFormVisible}/>
        {createReviewFormVisible && 
        <CreateReview setCreateReviewFormVisible={setCreateReviewFormVisible} allGames={allGames} addNewReview={addNewReview}/>}
        <ListReviews reviews={reviews} setGameDetailsVisible={setGameDetailsVisible} onClickHandleGameDetailsVisible={handleGameDetailsVisible}/>
        {gameDetailsVisible &&
        <GameDetailsModal setGameDetailsVisible={setGameDetailsVisible} gameDetails={gameDetails}/>}
     </div>
    </PrimeReactProvider>
  )
}

export default App;
