export type VenueItemProps = {
    id: number,
    venueName: string
}

const VenueItem = (props: VenueItemProps) => {
    return (
        <li>
          <h4>{props.venueName}</h4>
          <button>Open Venue Details</button>
        </li>
    )
}

export default VenueItem