import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ViewVenueList from '../components/ViewVenueList';
import ViewGigList from '../components/GigRequestLists';





const VenueDetails = () => {
    const {id} = useParams()
      const [currentVenue, setVenue] = useState([])
      const [currentGigs, setGigs] = useState([])
      
    
      const fetchVenues = async () => {
    
        const results = await fetch('http://localhost:3000/venue/'+id)
        const data = await results.json()
        return data
    }

    const fetchGigs = async () => {
    
      const results = await fetch('http://localhost:3000/gigs-by-venue/'+id)
      const data = await results.json()
      return data
  }
    
      useEffect(() => {
          fetchVenues().then(setVenue)
          fetchGigs().then(setGigs)
      }, [])


    return(
      <>
        <Navbar/>

        <br></br>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>

        <br></br> 
        
        <ViewGigList GigArray={currentGigs} GigIdShow={id} />
        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        
        </>
    );
};
export default  VenueDetails;