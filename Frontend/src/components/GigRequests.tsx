
import { useState } from 'react';

export interface ViewGig {
  request_id: number,
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
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/gig-approve/${props.request_id}` , {method: 'POST'})
      const data = await results.json()
      return data
    }
    const denyEvent = () => {
        DenyGig()
        setApprovalStatus(false)
    };
    
    const DenyGig = async () => {
      const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/gig-deny/${props.request_id}`, {method: 'POST'})
      const data = await results.json()
      return data
    }
    return(
      <div className='col'>
        <div className="card text-center">
          <h3 className="card-header">{props.artist}</h3>
          <div className="card-body">
            <p className="card-text"> Date: {props.date} </p>
            <p className="card-text">Genre: {props.artist_genre}</p>
            {approvalStatus === null && <p className="card-text">Approval Status: Pending </p> }
            {approvalStatus === true && <p className="card-text">Approval Status: Approved </p> }
            {approvalStatus === false && <p className="card-text">Approval Status: Denied </p> }
            <button className="approval-status-button btn btn-dark mx-1" onClick={approveEvent}>Approve</button>
            <button className="approval-status-button btn btn-dark mx-1" onClick={denyEvent}>Deny</button>
          </div>
        </div>
      </div>
    );
  };
  export default  GigRequests;