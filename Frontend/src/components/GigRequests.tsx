
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
          <h3 className="card-header actcitingOrange bg-dark">{props.artist}</h3>
          <div className="card-body">
            <p className="card-text fs-6 fw-bold"> Date: {props.date} </p>
            <p className="card-text fs-6 fw-bold">Genre: {props.artist_genre}</p>
            {approvalStatus === null && <p className="card-text fs-6 fw-bold">Approval Status: <span className="badge rounded-pill text-bg-warning">Pending</span> </p> }
            {approvalStatus === true && <p className="card-text fs-6 fw-bold">Approval Status: <span className="badge rounded-pill bg-success">Approved</span> </p> }
            {approvalStatus === false && <p className="card-text fs-6 fw-bold">Approval Status: <span className="badge rounded-pill bg-danger">Denied</span> </p> }
            <button className="approval-status-button btn btn-success mx-1" onClick={approveEvent}>Approve</button>
            <button className="approval-status-button btn btn-danger mx-1" onClick={denyEvent}>Deny</button>
          </div>
        </div>
      </div>
    );
  };
  export default  GigRequests;