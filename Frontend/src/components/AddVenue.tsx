import { useState } from "react"

export interface AddVenueProps {
    handleAddVenueClick?: () => void
    newVenueDivState: string
    clickHandler?:() => void
}

const AddVenue = (props: AddVenueProps) => {
    const [Name, setValue] = useState('')
   



    const clickHandler = () => {
        fetch('http://localhost:3000/venues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: Name,
           // capacity: event.capacity,
            // address: event.venueAddress,
            // geolocation: event.venueGeolocation,
            // email: event.Email,
            // start_date: event.venueStartDate,
            // end_date: event.venueEndDate,
          })
        })
          .then(response => {
            if (response.status >= 400) {
              throw new Error(`error status: ${response.status}`)
            }else{
                console.log("success")
            }
            return response.text()
          })
          .catch(error => console.log('there was an error:', error))

          console.log(Name)
      

    }






    return (
        <div>
            <button className='btn btn-primary' type='button' onClick={props.handleAddVenueClick}>Add Venue</button>

            <div className={`addVenueForm ${props.newVenueDivState}`} data-testid="venueForm">
                <label htmlFor="venueName">Venue Name:</label>
                <input className="form-control" type="text" id="venueName" name = "venueName"  value={Name} onInput={(event) => setValue((event.target as HTMLInputElement).value)} ></input>

                <label htmlFor="venueCapacity"> Venue Capacity:</label>
                <input className="form-control" type="text" id ="capacity"></input>

                <label htmlFor="venueAddress"> Venue Address:</label>
                <input className="form-control" type="text" id ="venueAddress"></input>

                <label htmlFor="venueGeolocation"> Venue Geolocation:</label>
                <input className="form-control" type="text" id = "venueGeolocation"></input>

                <label htmlFor="Email"> Email:</label>
                <input className="form-control" type="text" id="Email"></input>

                <label htmlFor="venueStartDAte"> Venue Start Date</label>
                <input className="form-control" type="text" id = "venueStartDate"></input>

                <label htmlFor="venueEndDAte"> Venue End Date</label>
                <input className="form-control" type="text" id = "venueEndDate"></input>

                <button onClick={clickHandler }>Submit</button>
            </div>
        </div>
    )
}

export default AddVenue