import { useState, useEffect } from "react"
import AddVenue from "../components/AddVenue"
import VenueList from "../components/VenueList"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import MainHero from "../components/MainHero";



const VenuePage = () => {

    const [currentVenues, setVenues] = useState([])
    
    const [newVenueDivDisplay, setNewVenueDivDisplay] = useState('hide')

  const addVenueClickHandler = () => {
    newVenueDivDisplay === 'hide' ? setNewVenueDivDisplay('show') : setNewVenueDivDisplay('hide')
  }
  



    const fetchVenues = async () => {
        const results = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/venues`)
        const data = await results.json()
        return data
    }

    useEffect(() => {
        fetchVenues().then(setVenues)
    }, [])


  return (
    <>
      <Navbar/>
      <MainHero/>
      <AddVenue handleAddVenueClick={addVenueClickHandler} newVenueDivState={newVenueDivDisplay} />
      <VenueList venueArray={currentVenues} />
      <Footer/>
    </>
  );
};

export default VenuePage;
