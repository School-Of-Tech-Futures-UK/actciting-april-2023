import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ViewVenueList from '../components/ViewVenueList';
import GigRequests from '../components/GigRequests';





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


    return(
      <>
        <Navbar/>

        <br></br>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>

        <br></br> 
        
        <GigRequests/>
        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        
        </>
    );
};
export default  VenueDetails;