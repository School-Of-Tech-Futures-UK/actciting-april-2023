import VenueItem from "./VenueItem"

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

export type VenueListProps = {
    venueArray: Array<Venue>
}

const VenueList = (props: VenueListProps) => {
    return (
        <>
        <div className="container px-4 py-5" id="custom-cards">
          <h1 className="fw-bold pb-2">Venues List</h1>
          <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
            {props.venueArray.map((venue, index) => (
              <VenueItem key={venue.venue_id} venueId={venue.venue_id} name={venue.name} capacity={venue.capacity}
              address={venue.address} geolocation={venue.geolocation} image={venue.image}
              email={venue.email} startDate={venue.start_date} endDate={venue.end_date}/>
            ))}
          </div>
        </div>
        </>
    )
}

export default VenueList