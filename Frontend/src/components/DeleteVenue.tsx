export interface deleteVenueProps {
    handleDeleteVenueClick?: () => void
}

const DeleteVenue = (props: deleteVenueProps) => {
    return (
        <div className="px-5 bg-dark">
            <div className="container-fluid py-4">
                <h1 className="display-5 fw-bold text-light">Delete Venue</h1>
                <p className="fs-4 text-light">Don't need your venue anymore? You can delete it here.</p>
                <button className='btn btn-primary my-2 btn-lg btn-light'  onClick={props.handleDeleteVenueClick}>Delete </button>
            </div>
        </div>
    )
}

export default DeleteVenue