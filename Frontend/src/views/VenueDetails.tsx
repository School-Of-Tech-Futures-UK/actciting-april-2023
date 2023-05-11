import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import VenuePage from './VenuePage';
import VenueItem from '../components/VenueItem';
import VenueList from '../components/VenueList';
import ViewVenueItem from '../components/ViewVenueItem';
import ViewVenueList from '../components/ViewVenueList';



const VenueDetails = () => {
  const {id} = useParams()
  const [currentVenue, setVenue] = useState([])

  const fetchVenues = async () => {

    const results = await fetch('http://localhost:3000/venue/'+id)
    const data = await results.json()
    return data
}

  useEffect(() => {
      fetchVenues().then(setVenue)
  }, [])

  const onSelectVenue = (venue_id: any) => {
    setVenue(venue_id)
    console.log(currentVenue)
  }



    return(
      <>
        <Navbar/>
        <br></br>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>
        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        </>
    );
};
export default  VenueDetails;