import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ViewVenueList from '../components/ViewVenueList';
import ViewGigList from '../components/GigRequestLists';
import Footer from '../components/Footer';
import DeleteVenue from '../components/DeleteVenue';




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
     
    const fetchVenue = async () => {
        const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues/${id}`)
        const data = await results.json()
        return data
    }

    const fetchGigs = async () => {
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/gigs-by-venue/${id}`)
      const data = await results.json()
      return data
    }
  
    const onSelectVenue = (venue_id: any) => {
      setVenue(venue_id)
      console.log(currentVenue)
    }
    
    useEffect(() => {
      fetchVenue().then(setVenue)
      fetchGigs().then(setGigs)
    }, [])


    return(
      <>
        <Navbar/>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>
        <DeleteVenue handleDeleteVenueClick={handleDeleteClick}/>
        <ViewGigList GigArray={currentGigs} GigIdShow={id} />
        <Footer/>      
        </>
    );
};
export default  VenueDetails;