import {GigRequests, ViewGig} from "./GigRequests"

export interface Venue {
    venue_id: number,
    name: string,
    capacity: number,
    address: string,
    geolocation: string,
    image: string,
    email: string,
    start_date: number,
    end_date: number
}

export type ViewGigListProps = {
    GigArray: Array<ViewGig>,
    GigIdShow: any,
    VenueDetails: Array<Venue>
}

const ViewGigList = (props: ViewGigListProps) => {  
    return (
        <>
        {props.VenueDetails.map((Venue, index) => (
            <div className="container px-4 py-5" id="custom-cards">
                <h1 className="fw-bold pb-2">Gigs for {Venue.name}</h1>
                {props.GigArray.length ?
                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    {props.GigArray.map((Gig, index) => (
                        <GigRequests key={Gig.request_id} request_id={Gig.request_id} venue_id={Gig.venue_id} artist_name={Gig.artist_name} 
                        artist_genre={Gig.artist_genre} contact_email={Gig.contact_email} date={Gig.date} approval_status={Gig.approval_status}/>
                    ))}
                </div> :
                <div className="alert alert-danger alert-dismissible fade show my-4" role="alert">
                There are no Gigs available right now for this venue. Please check again later.
                </div>
                }
            </div>
        ))}
        </>
    )
}

export default ViewGigList