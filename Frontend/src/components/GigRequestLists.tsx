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
                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    {props.GigArray.map((Gig, index) => (
                        <GigRequests key={Gig.gig_id} gig_id={Gig.gig_id} venue_id={Gig.venue_id} artist={Gig.artist}
                        artist_genre={Gig.artist_genre} date={Gig.date} approval_status={Gig.approval_status}/>
                    ))}
                </div>
            </div>
        ))}
        </>
    )
}

export default ViewGigList