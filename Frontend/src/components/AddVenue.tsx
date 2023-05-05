export interface AddVenueProps {
    handleAddVenueClick?: () => void
    newVenueDivState: string
}

const AddVenue = (props: AddVenueProps) => {
    return (
        <div>
            <button className='btn btn-primary' type='button' onClick={props.handleAddVenueClick}>Add Venue</button>

            <div className={`addVenueForm ${props.newVenueDivState}`} data-testid="venueForm">
                <label htmlFor="venueName">Venue Name:</label>
                <input className="form-control is-valid" type="text" id="venueName"></input>

                <label htmlFor="venueCapacity"> Venue Capacity:</label>
                <input className="form-control is-valid" type="text"></input>

                <label htmlFor="venueAddress"> Venue Address:</label>
                <input className="form-control is-valid" type="text" id ="venueAddress"></input>

                <label htmlFor="venueGeolocation"> Venue Geolocation:</label>
                <input className="form-control is-valid" type="text" id = "venueGeolocation"></input>

                <label htmlFor="Email"> Email:</label>
                <input className="form-control is-valid" type="text" id="Email"></input>

                <label htmlFor="venueStartDAte"> Venue Start Date</label>
                <input className="form-control is-valid" type="text" id = "venueStartDate"></input>

                <label htmlFor="venueEndDAte"> Venue End Date</label>
                <input className="form-control is-valid" type="text" id = "venueEndDate"></input>

                <button /*onClick={function to submit data to database }*/>Submit</button>
            </div>
        </div>
    )
}

export default AddVenue