import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ViewVenueItem from '../components/ViewVenueItem';
import ViewVenueList from '../components/ViewVenueList';

const VenueDetails = () => {
  const {id} = useParams()
  const [currentVenues, setVenues] = useState([])
  // const setVenues = {
  // "venueId":1,
  // "name":"The 02",
  // "capacity":20000,
  // "address":"Peninsula Square, London SE10 0DX",
  // "geolocation":"51.50325308011004, 0.0031158253165805916",
  // "image":"https://lh5.googleusercontent.com/p/AF1QipP2sN2qKTb-4beqF1zFeMWGCP3vW-Ih1X2o4QfE=w426-h240-k-no",
  // "email":"02contactemail@02.com",
  // "start_date":1012023,
  // "end_date":1052023}
  
  const fetchVenues = async () => {
    const results = await fetch(`http://localhost:3001/venue/1`)
    // const results = await fetch('http://localhost:3001/venue/' + {id})
    const data = await results.json()
    return data
}

useEffect(() => {
    fetchVenues().then(setVenues)
}, [])



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