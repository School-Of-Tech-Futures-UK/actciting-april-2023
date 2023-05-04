export type VenueItemProps = {
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

const VenueItem = (props: VenueItemProps) => {
    return (
        <li className="venueItem">
            <img className="venueImage" src={props.image} alt={props.name}></img>
            <h4>{props.name}</h4>
            <h6>Capacity: {props.capacity}</h6>
            <h6>{props.address}</h6>
            <h6>{props.email}</h6>
            <h6>Available: {props.startDate} - {props.endDate}</h6>
            <button className='btn btn-primary' type='button' >Open Venue Details</button>
        </li>
    )
}

export default VenueItem