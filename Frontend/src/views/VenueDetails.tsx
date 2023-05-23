import { useState,useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ViewVenueList from '../components/ViewVenueList';
import ViewGigList from '../components/GigRequestLists';




const deleteHandler = (id:any) => {
  fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // Handle successful deletion
      } else {
        // Handle error
      }
    })
    .catch(error => {
      // Handle network or fetch error
    });
};

const VenueDetails = () => {
    const {id} = useParams()
    const [currentVenue, setVenue] = useState([])
    const [currentGigs, setGigs] = useState([])
        
    const handleDeleteClick = () => {
      deleteHandler(id);
    }    
     
    const fetchVenues = useCallback(async () => {
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues/${id}`)
      const data = await results.json()
      return data
  }, [id]) 

    const fetchGigs = useCallback (async () => {
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/gigs-by-venue/${id}`)
      const data = await results.json()
      return data
    },[id]) 
    
    useEffect(() => {
      fetchVenues().then(setVenue)
      fetchGigs().then(setGigs)
    }, [fetchVenues, fetchGigs])


    return(
      <>
        <Navbar/>

        <br></br>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>
        <a className='btn btn-primary my-2'  onClick={handleDeleteClick} href = "/">Delete </a>
        <br></br> 
        
        <ViewGigList GigArray={currentGigs} GigIdShow={id} />
        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        
        </>
    );
};
export default  VenueDetails;