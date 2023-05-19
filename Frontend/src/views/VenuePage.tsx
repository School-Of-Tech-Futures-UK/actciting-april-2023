import { useState, useEffect } from "react"
import AddVenue from "../components/AddVenue"
import VenueList from "../components/VenueList"
import Navbar from "../components/Navbar"
import About from "./About";



const VenuePage = () => {

    const [currentVenues, setVenues] = useState([])
    
    const [newVenueDivDisplay, setNewVenueDivDisplay] = useState('hide')

  const addVenueClickHandler = () => {
    newVenueDivDisplay === 'hide' ? setNewVenueDivDisplay('show') : setNewVenueDivDisplay('hide')
  }
  



    const fetchVenues = async () => {
        const results = await fetch(`http://localhost:3000/venues`)
        const data = await results.json()
        return data
    }

    useEffect(() => {
        fetchVenues().then(setVenues)
    }, [])


  return (
    <>
    <Navbar/>
      <AddVenue handleAddVenueClick={addVenueClickHandler} newVenueDivState={newVenueDivDisplay} />
      <VenueList venueArray={currentVenues} />
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <p className="footerName col-md-4 mb-0 text-muted px-5">© ActCiting April 2023</p>

        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
            width="40" height="32" viewBox="0 0 483.095 483.095">
            <g>
              <g>
                <path d="M377.6,125.398c8.051-7.326,18.943-9.081,27.078-4.883l1.56-1.553c4.904-12.028,13.757-25.333,26.031-37.604
                  c12.283-12.276,25.584-21.135,37.606-26.042c0,0,2.368-2.369,5.298-5.298c2.925-2.93,1.154-9.438-3.96-14.547L441.142,5.396
                  c-5.105-5.109-11.594-6.906-14.482-4.015l-5.238,5.236c-4.889,12.062-13.773,25.441-26.116,37.784
                  c-12.331,12.331-25.708,21.219-37.782,26.115l-1.082,1.078c5.178,8.233,3.574,19.979-4.168,28.487l-80.781,80.303
                  c-3.494-0.226-9.117-3.047-16.635-14.697C241.416,144.86,210.046,133,184.21,177.817c-25.836,44.817-4.408,52.227-77.991,60.774
                  l0.016,0.024c-25.982,1.429-50.592,11.36-69.375,30.136C-7.68,313.295-2.604,390.594,48.2,441.408
                  c50.806,50.806,128.113,55.879,172.654,11.328c0.797-0.797,1.557-1.639,2.324-2.46l0.014,0.032c0,0,0.293-0.316,0.775-0.866
                  c3.573-3.903,6.777-8.026,9.636-12.343c11.461-16.27,27.822-45.524,24.159-76.081c-5.538-46.129,37.694-44.021,55.619-55.623
                  c17.921-11.598,24.249-21.607,24.77-33.218c0,0-21.352,15.028-40.855-4.476c-15.677-15.678-8.708-42.391-1.947-56.529
                  L377.6,125.398z"/>
              </g>
            </g>
          </svg>
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><a href="Contact" className="nav-link px-5 text-muted">Contact Us</a></li>
        </ul>
      </footer>
    </>
  );
};

export default VenuePage;
