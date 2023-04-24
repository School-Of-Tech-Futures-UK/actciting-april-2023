import { Route, Routes } from 'react-router-dom'
import VenuePage from '../views/VenuePage'

const ActCitingRoutes = () => (
    <Routes>
        <Route path='/' element={<VenuePage/>}/>
    </Routes>
)

export default ActCitingRoutes