export interface AddVenueProps {
    handleAddVenueClick?: () => void
    newVenueDivState: string
}

const AddVenue = (props: AddVenueProps) => {
    return (
        <div>
            <button className='btn btn-primary' type='button' onClick={props.handleAddVenueClick}>Add Venue</button>

            <div className={`addVenueForm ${props.newVenueDivState}`}>
                <input type="text"></input>
            </div>
        </div>
    )
}

export default AddVenue