import VenueItem from "./VenueItem"

export interface Venue {
    venueId: number,
    name: string,
    capacity: number,
    address: string,
    geolocation: string,
    image: string,
    email: string,
    startDate: number,
    endDate: number
}

export type VenueListProps = {
    venueArray: Array<Venue>
}

const VenueList = (props: VenueListProps) => {
    return (
        <ul>
          {props.venueArray.map((venue, index) => (
            <VenueItem key={venue.venueId} venueId={venue.venueId} name={venue.name} capacity={venue.capacity}
            address={venue.address} geolocation={venue.geolocation} image={venue.image}
            email={venue.email} startDate={venue.startDate} endDate={venue.endDate}/>
          ))}
        </ul>
    )
}

export default VenueList