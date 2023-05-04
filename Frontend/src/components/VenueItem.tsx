export type VenueItemProps = {
    id: number,
    venueName: string
}

const VenueItem = (props: VenueItemProps) => {
    const baseUrl = 'localhost:3000'
    const venueRename = props.venueName.replaceAll(' ', '').toLowerCase()
    const fullUrl = baseUrl + '/' + venueRename

    return (
        <li>
          <h4>{props.venueName}</h4>
          <button className='btn btn-primary' type='button' onClick={() => window.open(fullUrl)}>View Venue</button>
        </li>
    )
}

export default VenueItem