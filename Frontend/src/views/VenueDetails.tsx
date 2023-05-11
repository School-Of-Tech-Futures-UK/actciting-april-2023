import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import AddVenue from "../components/AddVenue"
import VenuePage from './VenuePage';
import VenueItem from '../components/VenueItem';
import VenueList from '../components/VenueList';

export type VenuePageProps = {
  id: number,
  venueName: string,
  artistName: string,
  eventTime: string,
}

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