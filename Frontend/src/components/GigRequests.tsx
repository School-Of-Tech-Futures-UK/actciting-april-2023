
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'

export interface ViewGig {
  gig_id: number,
  artist: string,
  venue_id: number,
  artist_genre: string,
  date: string,
  approval_status: boolean,
}



export const GigRequests = (props: ViewGig) => {

    const [approvalStatus, setApprovalStatus] = useState('pending');
    const approveEvent = () => {
      setApprovalStatus('approved');
      fetch('http://localhost:3000/gig-approve/'+props.gig_id)
    };
  
    const denyEvent = () => {
      setApprovalStatus('denied');
      fetch('http://localhost:3000/gig-deny/'+props.gig_id)
    };
  
    return(
      <div className="col d-flex justify-content-center mb-3">
            <div className="venueItem card text-center bg-light h-100">
                <div className="card-body">
                    <h4 className="card-title">{props.artist}</h4>
                    <p className="card-text">
                        Date: {props.date}
                        <br></br>
                        Genre: {props.artist_genre}
                        <br></br>
                        Approval Status: {props.approval_status}

                    </p>
                </div>
            </div>
      

  
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