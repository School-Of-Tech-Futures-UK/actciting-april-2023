import {GigRequests, ViewGig} from "./GigRequests"

export type ViewGigListProps = {
    GigArray: Array<ViewGig>,
    GigIdShow: any
}

const ViewGigList = (props: ViewGigListProps) => {
    const { GigIdShow } = props;
  
  
    return (
        <>
        <h2>Gig Details for {GigIdShow} </h2>

            {props.GigArray.map((Gig, index) => (
              <GigRequests key={Gig.gig_id} gig_id={Gig.gig_id} venue_id={Gig.venue_id} artist={Gig.artist}
              artist_genre={Gig.artist_genre} date={Gig.date} approval_status={Gig.approval_status}/>
            ))}


        </>
    )
}

export default ViewGigList