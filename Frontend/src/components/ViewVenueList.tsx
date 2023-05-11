// import VenueItem from "./VenueItem"
import ViewVenueItem from "./ViewVenueItem"

export interface ViewVenue {
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

export type ViewVenueListProps = {
    venueArray: Array<ViewVenue>,
    venueIdShow: any
}

const ViewVenueList = (props: ViewVenueListProps) => {
    const { venueArray, venueIdShow } = props;
  
    const filteredVenueArray = venueArray.filter(venue => venue.venue_id === venueIdShow);
  
    return (
        <>
        <h2>(change to venue name from api) Venues for {venueIdShow} </h2>

            {props.venueArray.map((venue, index) => (
              <ViewVenueItem key={venue.venue_id} venueId={venue.venue_id} name={venue.name} capacity={venue.capacity}
              address={venue.address} geolocation={venue.geolocation} image={venue.image}
              email={venue.email} startDate={venue.start_date} endDate={venue.end_date}/>
            ))}

            {/* {filteredVenueArray.map((venue, index) => (
            <ViewVenueItem key={venue.venue_id} venueId={venue.venue_id} name={venue.name} capacity={venue.capacity}
            address={venue.address} geolocation={venue.geolocation} image={venue.image}
            email={venue.email} startDate={venue.start_date} endDate={venue.end_date}/>
            ))} */}

        </>
    )
}

export default ViewVenueList