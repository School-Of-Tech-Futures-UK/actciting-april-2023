import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import VenuePage from './VenuePage';
import VenueItem from '../components/VenueItem';
import VenueList from '../components/VenueList';
import ViewVenueItem from '../components/ViewVenueItem';
import ViewVenueList from '../components/ViewVenueList';

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

  const {id} = useParams()


    return(
      <>
        <Navbar/>
        <br></br> 
        <ViewVenueList venueArray={currentVenues} venueIdShow={id}/>
        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        </>
    );
};
export default  VenueDetails;