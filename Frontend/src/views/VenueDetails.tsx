import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import AddVenue from "../components/AddVenue"
import VenuePage from './VenuePage';
import VenueItem from '../components/VenueItem';
import VenueList from '../components/VenueList';

import ViewVenueItem from '../components/ViewVenueItem';
import ViewVenueList from '../components/ViewVenueList';



export type VenuePageProps = {
  id: number,
  venueName: string,
  artistName: string,
  eventTime: string,
}

const deleteHandler = (id:any) => {
  fetch(`http://localhost:3000/venue/${id}`, {
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
  const handleDeleteClick = () => {
    deleteHandler(id);}
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


  const [approvalStatus, setApprovalStatus] = useState('pending');

  const approveEvent = () => {
    setApprovalStatus('approved');
  };

  const denyEvent = () => {
    setApprovalStatus('denied');
  };


    return(
      <>
        <Navbar/>

        <br></br>
        <ViewVenueList venueArray={currentVenue} venueIdShow={id}/>
        <a className='btn btn-primary my-2'  onClick={handleDeleteClick} href = "/">Delete </a>
        <br></br> 
        <h1>Venue Details for{id} </h1>
        <h2></h2>
        <p>Some content about the venue.</p>
        <div>
        {approvalStatus === 'pending' && (
          <>
            <button onClick={approveEvent}>Approve</button>
            <button onClick={denyEvent}>Deny</button>
          </>
        )}
        {approvalStatus === 'approved' && <p>Event approved!</p>}
        {approvalStatus === 'denied' && <p>Event denied.</p>}
      </div>

        <footer>
            <a href="/Contact">Contact Us</a>
        </footer>
        
        </>
    );
};
export default  VenueDetails;