
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'

export type VenuePageProps = {
    id: number,
    venueName: string,
    artistName: string,
    eventTime: string,
  }
  



  const GigRequests = () => {
  
  
  
    const [approvalStatus, setApprovalStatus] = useState('pending');
  
    const approveEvent = () => {
      setApprovalStatus('approved');
    };
  
    const denyEvent = () => {
      setApprovalStatus('denied');
    };
  
  
      return(
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
      );
  };
  export default  GigRequests;