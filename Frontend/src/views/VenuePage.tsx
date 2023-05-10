import { useState } from "react"
import AddVenue from "../components/AddVenue"
import VenueList from "../components/VenueList"

export type VenuePageProps = {
  id: number,
  venueName: string,
  artistName: string,
  eventTime: string,
}

const VenuePage = () => {

  const [currentVenues, setVenues] = useState(
    [{
      id: 1,
      venueName: 'The 02 Arena',
    },
    {
      id: 2,
      venueName: 'Wembley',
    },
    {
      id: 3,
      venueName: 'MGM Las Vegas',
    }]
  )

  const [newVenueDivDisplay, setNewVenueDivDisplay] = useState('hide')

  const addVenueClickHandler = () => {
    newVenueDivDisplay === 'hide' ? setNewVenueDivDisplay('show') : setNewVenueDivDisplay('hide')
  }

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
