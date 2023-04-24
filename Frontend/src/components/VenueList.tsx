import VenueItem from "./VenueItem"

export type VenueListProps = {
    venueArray: Array<{id: number, venueName: string}>
}

const VenueList = (props: VenueListProps) => {
    return (
        <ul>
          {props.venueArray.map(item => <VenueItem id={item.id} venueName={item.venueName} />)}
        </ul>
    )
}

export default VenueList