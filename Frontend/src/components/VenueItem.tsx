export type VenueItemProps = {
    id: number,
    venueName: string
}

const VenueItem = (props: VenueItemProps) => {
    return (
        <li>
          <h4>{props.venueName}</h4>
          <button className='btn btn-primary' type='button' >Open Venue Details</button>
        </li>
    )
}

export default VenueItem