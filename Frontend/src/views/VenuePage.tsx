import { useState } from "react"
import AddVenue from "../components/AddVenue"
import VenueList from "../components/VenueList"

const VenuePage = () => {

    const [currentVenues, setVenues] = useState(
        [{
            id: 1,
            venueName: 'The 02 Arena',
        },
        {
            id: 2,
            venueName: 'Wembley',
        },
        {
            id: 3,
            venueName: 'MGM Las Vegas',
        }]
    )
    
    const [newVenueDivDisplay, setNewVenueDivDisplay] = useState('hide')

    const addVenueClickHandler = () => {
        newVenueDivDisplay === 'hide'? setNewVenueDivDisplay('show') : setNewVenueDivDisplay('hide')
    }

    return (
        <>
        <h1>ActCiting</h1>
        <AddVenue handleAddVenueClick={addVenueClickHandler} newVenueDivState={newVenueDivDisplay}/>
        <VenueList venueArray={currentVenues}/>
        <footer>
            <a href="/">Contact Us</a>
        </footer>
        </>
    )
}

export default VenuePage