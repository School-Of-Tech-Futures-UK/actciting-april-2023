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
        <AddVenue handleAddVenueClick={addVenueClickHandler} newVenueDivState={newVenueDivDisplay}/>
        <VenueList venueArray={currentVenues}/>
        <footer>
            <a href="/">Contact Us</a>
        </footer>
        </>
    )
}

export default VenuePage