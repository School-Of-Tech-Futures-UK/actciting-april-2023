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

    let startDateString = props.venueArray[0].start_date.toString()
    let endDateString = props.venueArray[0].end_date.toString()

    const formatDate = (date: string) => {
        const year = date.substring(0,4)
        const month = date.substring(4,6)
        const day = date.substring(6,8)
        return `${day}/${month}/${year}`
    }

    const newStartDate = formatDate(startDateString)
    const newEndDate = formatDate(endDateString)

    return (
        <>
            {props.venueArray.map((venue, index) => (
                <div>
                    <ViewVenueItem key={venue.venue_id} venueId={venue.venue_id} name={venue.name} capacity={venue.capacity}
                    address={venue.address} geolocation={venue.geolocation} image={venue.image}
                    email={venue.email} startDate={newStartDate} endDate={newEndDate}/>
                </div>
            ))}
        </>
    )
}

export default ViewVenueList