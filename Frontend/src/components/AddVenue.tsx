import { useState } from "react"
import { useNavigate } from "react-router-dom"

export interface AddVenueProps {
    handleAddVenueClick?: () => void
    newVenueDivState: string
    clickHandler?:() => void
}

const AddVenue = (props: AddVenueProps) => {
    const [Name, setValue] = useState('')
    const [CapacityVal, setCapacity] = useState('')
    const [AddressVal, setAddress] = useState('')
    const [GeolocationVal, setGeolocation] = useState('')
    const [EmailVal, setEmail] = useState('')
    const [StartVal, setStart] = useState('')
    const [EndVal, setEnd] = useState('')

    const navigator = useNavigate()

    const clickHandler = () => {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: Name,
            capacity: CapacityVal,
            address: AddressVal,
            geolocation: GeolocationVal,
            image: "https://lh5.googleusercontent.com/p/AF1QipP2sN2qKTb-4beqF1zFeMWGCP3vW-Ih1X2o4QfE=w426-h240-k-no", // placeholder image
            email: EmailVal,
            start_date: StartVal,
            end_date: EndVal,
          })
        })
        .then(response => {
          if (response.status >= 400) {
            throw new Error(`error status: ${response.status}`)
          }else{
              console.log("success")
              navigator("/")
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
                <input className="form-control" type="text" id ="capacity" value={CapacityVal} onInput={(event) => setCapacity((event.target as HTMLInputElement).value)}></input>

                <label htmlFor="venueAddress"> Venue Address:</label>
                <input className="form-control" type="text" id ="venueAddress" value={AddressVal} onInput={(event) => setAddress((event.target as HTMLInputElement).value)}></input>

                <label htmlFor="venueGeolocation"> Venue Geolocation:</label>
                <input className="form-control" type="text" id = "venueGeolocation" value={GeolocationVal} onInput={(event) => setGeolocation((event.target as HTMLInputElement).value)}></input>

                <label htmlFor="Email"> Email:</label>
                <input className="form-control" type="text" id="Email" value={EmailVal} onInput={(event) => setEmail((event.target as HTMLInputElement).value)}></input>

                <label htmlFor="venueStartDAte"> Venue Start Date</label>
                <input className="form-control" type="text" id = "venueStartDate" value={StartVal} onInput={(event) => setStart((event.target as HTMLInputElement).value)}></input>

                <label htmlFor="venueEndDAte"> Venue End Date</label>
                <input className="form-control" type="text" id = "venueEndDate"value={EndVal} onInput={(event) => setEnd((event.target as HTMLInputElement).value)}></input>

                <button className='btn btn-primary my-2' onClick={clickHandler}>Submit</button>
            </div>
        </div>
    )
}

export default AddVenue