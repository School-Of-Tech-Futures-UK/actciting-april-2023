import { useState, useEffect } from "react"
import AddVenue from "../components/AddVenue"
import VenueList from "../components/VenueList"
import Navbar from "../components/Navbar"

export type VenuePageProps = {
  id: number,
  venueName: string,
  artistName: string,
  eventTime: string,
}

const VenuePage = () => {

    const [currentVenues, setVenues] = useState([])
    
    const [newVenueDivDisplay, setNewVenueDivDisplay] = useState('hide')

  const addVenueClickHandler = () => {
    newVenueDivDisplay === 'hide' ? setNewVenueDivDisplay('show') : setNewVenueDivDisplay('hide')
  }
  



    const fetchVenues = async () => {
        const results = await fetch('http://localhost:3000/venues')
        const data = await results.json()
        return data
    }

    useEffect(() => {
        fetchVenues().then(setVenues)
    }, [])


  const [approvalStatus, setApprovalStatus] = useState('pending');

  const approveEvent = () => {
    setApprovalStatus('approved');
  };

  const denyEvent = () => {
    setApprovalStatus('denied');
  };

  return (
    <>
      <h1>ActCiting</h1>
      <AddVenue handleAddVenueClick={addVenueClickHandler} newVenueDivState={newVenueDivDisplay} />
      <VenueList venueArray={currentVenues} />
      <footer>
        <a href="/">Contact Us</a>
      </footer>
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
    </>
  );
};

export default VenuePage;
