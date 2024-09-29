import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { PrimeReactProvider } from 'primereact/api';
import Review from './components/Review';
import ListReviews from './components/ListReviews';

function App() {

  const [reviews, setReviews] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:8080/reviews')
    .then(response => setReviews(response.data))
    .catch(error => console.error(error));
  }, []);
  console.log('reviews', reviews);


  return (
    <PrimeReactProvider>
     <div className='reviews-container'>
        <h1>Reviews Blog</h1>
        <ListReviews reviews={reviews}/>
     </div>
    </PrimeReactProvider>
  )
}

export default App;
