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
    const baseUrl = 'localhost:3000'
    const venueRename = props.name.replaceAll(' ', '').toLowerCase()
    const fullUrl = baseUrl + '/' + venueRename

    return (
        <li className="venueItem">
            <img className="venueImage" src={props.image} alt={props.name}></img>
            <h4>{props.name}</h4>
            <h6>Capacity: {props.capacity}</h6>
            <h6>{props.address}</h6>
            <h6>{props.email}</h6>
            <h6>Available: {props.startDate} - {props.endDate}</h6>
            <button className='btn btn-primary' type='button' onClick={() => window.open(fullUrl)}>View Venue</button>
        </li>
    )
}

export default VenueItem