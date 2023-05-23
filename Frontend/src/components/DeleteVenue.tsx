export interface deleteVenueProps {
    handleDeleteVenueClick?: () => void
}

const DeleteVenue = (props: deleteVenueProps) => {
    return (
        <a className='btn btn-primary my-2'  onClick={props.handleDeleteVenueClick} href = "/">Delete </a>
    )
}

export default DeleteVenue