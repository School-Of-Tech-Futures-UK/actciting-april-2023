export interface AddVenueProps {
    handleAddVenueClick?: () => void
    newVenueDivState: string
}

const AddVenue = (props: AddVenueProps) => {
    return (
        <div>
            <button onClick={props.handleAddVenueClick}>Add Venue</button>

            <div className={`addVenueForm ${props.newVenueDivState}`}>
                <label htmlFor="venueName">Venue Name:</label>
                <input type="text" id="venueName"></input>

                <label htmlFor="venueCapacity"> Venue Capacity:</label>
                <input type="text"></input>

                <label htmlFor="venueAddress"> Venue Address:</label>
                <input type="text" id ="venueAddress"></input>

                <label htmlFor="venueGeolocation"> Venue Geolocation:</label>
                <input type="text" id = "venueGeolocation"></input>

                <label htmlFor="Email"> Email:</label>
                <input type="text" id="Email"></input>

                <label htmlFor="venueStartDAte"> Venue Start Date</label>
                <input type="text" id = "venueStartDate"></input>

                <label htmlFor="venueEndDAte"> Venue End Date</label>
                <input type="text" id = "venueEndDate"></input>

                <button /*onClick={function to submit data to database }*/>Submit</button>
            </div>
        </div>
    )
}

export default AddVenue