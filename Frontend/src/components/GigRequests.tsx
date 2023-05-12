
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

    const [approvalStatus, setApprovalStatus] = useState(props.approval_status);
    const approveEvent = () => {
      ApproveGig()
      setApprovalStatus(true)
    };
  
    const ApproveGig = async () => {
      const results = await fetch('http://localhost:3000/gig-approve/'+props.gig_id , {method: 'PUT'})
      const data = await results.json()
      return data
    }
    const denyEvent = () => {
        DenyGig()
        setApprovalStatus(false)
    };
    
    const DenyGig = async () => {
      const results = await fetch('http://localhost:3000/gig-deny/'+props.gig_id, {method: 'PUT'})
      const data = await results.json()
      return data
    }
    return(
      <div className="col d-flex justify-content-center mb-3">
            <div className="venueItem card text-center bg-light h-100">
                <div className="card-body">
                    <h4 className="card-title">{props.artist}</h4>
                    <p className="card-text"> Date: {props.date} </p>
                        <p className="card-text">Genre: {props.artist_genre}</p>
                        {approvalStatus === null && <p className="card-text">Approval Status: Pending </p> }
                        {approvalStatus === true && <p className="card-text">Approval Status: Approved </p> }
                        {approvalStatus === false && <p className="card-text">Approval Status: Denied </p> }

                </div>
            </div>
      

  
      {approvalStatus === null && (
        <>
          <button onClick={approveEvent}>Approve</button>
          <button onClick={denyEvent}>Deny</button>
        </>
      )}

    </div>
    );
  };
  export default  GigRequests;