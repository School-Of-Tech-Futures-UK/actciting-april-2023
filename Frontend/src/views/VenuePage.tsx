import { useState, useEffect } from "react"
import AddVenue from "../components/AddVenue"
import VenueList from "../components/VenueList"
import Navbar from "../components/Navbar"

const VenuePage = () => {

    const [currentVenues, setVenues] = useState([])
    
    const [newVenueDivDisplay, setNewVenueDivDisplay] = useState('hide')

    const addVenueClickHandler = () => {
        newVenueDivDisplay === 'hide'? setNewVenueDivDisplay('show') : setNewVenueDivDisplay('hide')
    }
  

    const clickHandler = (event) => {
        // fetch('http://localhost:3000/venues', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     name: event.venueName,
        //     capacity: event.capacity,
        //     address: event.venueAddress,
        //     geolocation: event.venueGeolocation,
        //     email: event.Email,
        //     start_date: event.venueStartDate,
        //     end_date: event.venueEndDate,
        //   })
        // })
        //   .then(response => {
        //     if (response.status >= 400) {
        //       throw new Error(`error status: ${response.status}`)
        //     }else{
        //         console.log("success")
        //     }
        //     return response.text()
        //   })
        //   .catch(error => console.log('there was an error:', error))

          console.log(event.target.venueName)
      

    }


    const fetchVenues = async () => {
        const results = await fetch('http://localhost:3000/venues')
        const data = await results.json()
        return data
    }

    useEffect(() => {
        fetchVenues().then(setVenues)
    }, [])


    return (
        <>
        <Navbar/>
        <br></br>   
        <AddVenue handleAddVenueClick={addVenueClickHandler} newVenueDivState={newVenueDivDisplay} clickHandler ={clickHandler}/>
        <VenueList venueArray={currentVenues}/>
        <footer>
            <a href="/">Contact Us</a>
        </footer>
        </>
    )
}

export default VenuePage