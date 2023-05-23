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
    return (
        <>
            {props.venueArray.map((venue, index) => (
                <div>
                    <ViewVenueItem key={venue.venue_id} venueId={venue.venue_id} name={venue.name} capacity={venue.capacity}
                    address={venue.address} geolocation={venue.geolocation} image={venue.image}
                    email={venue.email} startDate={venue.start_date} endDate={venue.end_date}/>
                </div>
            ))}
        </>
    )
}

export default ViewVenueList