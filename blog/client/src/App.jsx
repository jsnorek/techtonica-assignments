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
 
  useEffect(() => {
    axios.get('http://localhost:8080/reviews')
    .then(response => setReviews(response.data))
    .catch(error => console.error(error));
  }, []);
  console.log('reviews', reviews);

  return (
    <PrimeReactProvider>
     <div className='reviews-container'>
        <h1>Community Game Review Blog</h1>
        <ListReviews reviews={reviews} setGameDetailsVisible={setGameDetailsVisible}/>
        {gameDetailsVisible &&
        <GameDetailsModal/>}
     </div>
    </PrimeReactProvider>
  )
}

export default App;
