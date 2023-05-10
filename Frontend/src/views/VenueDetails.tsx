import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import VenuePage from './VenuePage';
import VenueItem from '../components/VenueItem';
import VenueList from '../components/VenueList';
const VenueDetails = () => {
  const [currentVenues, setVenues] = useState([])
  
  const fetchVenues = async () => {
    const results = await fetch('http://localhost:3000/venues')
    const data = await results.json()
    return data
}

useEffect(() => {
    fetchVenues().then(setVenues)
}, [])

  const id = useParams()


    return(
      <>
        <Navbar/>
        <br></br> 
        <h1>Venue Details for </h1>
        <h2></h2>
        <p>Some content about the venue.</p>
        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        </>
    );
};
export default  VenueDetails;