import { Route, Routes } from 'react-router-dom'
import VenuePage from '../views/VenuePage'
import VenueDetails from '../views/VenueDetails'
import About from '../views/About'
import Contact from '../views/Contact'
const ActCitingRoutes = () => (
    <Routes>
        <Route path='/' element={<VenuePage/>}/>
        <Route path='/:id' element={<VenueDetails/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
    </Routes>
)

export default ActCitingRoutes