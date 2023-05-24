import { useState,useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ViewVenueList from '../components/ViewVenueList';
import ViewGigList from '../components/GigRequestLists';
import Footer from '../components/Footer';
import DeleteVenue from '../components/DeleteVenue';
import Venue404 from '../components/Venue404';

const VenueDetails = () => {
    const {id} = useParams()
    const [currentVenue, setVenue] = useState([])
    const [currentGigs, setGigs] = useState([])
    const navigator = useNavigate()
        
    const handleDeleteClick = () => {
      deleteHandler();
    }  
    
    const deleteHandler = () => {
      fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // Handle successful deletion
            console.log("success")
            setTimeout(() => {
              navigator("/")
              window.location.reload();
            },
            1000);
          } else {
            // Handle error
            console.log("delete error 1")
            setTimeout(() => {
              navigator("/")
              window.location.reload();
            },
            1000);
          }
        })
        .catch(error => {
          // Handle network or fetch error
          console.log("delete error 2")
            setTimeout(() => {
              navigator("/")
              window.location.reload();
            },
            1000);
        });
    };
     
    const fetchVenues = useCallback(async () => {
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues/${id}`)
      const data = await results.json()
      return data
    }, [id]) 

    const fetchGigs = useCallback (async () => {
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/gigs-by-venue/${id}`)
      const data = await results.json()
      return data
    }, [id]) 
    
    useEffect(() => {
      fetchVenues().then(setVenue)
      fetchGigs().then(setGigs)
    }, [fetchVenues, fetchGigs])


    return(
      <>
        {currentVenue.length ? 
        <>
        <Navbar/>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>
        <DeleteVenue handleDeleteVenueClick={handleDeleteClick}/>
        <ViewGigList GigArray={currentGigs} GigIdShow={id} VenueDetails={currentVenue}/>
        <Footer/>   
        </> :
        <Venue404/>
        }   
        </>
    );
};
export default  VenueDetails;