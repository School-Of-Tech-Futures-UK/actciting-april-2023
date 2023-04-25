import express from 'express'
import cors from 'cors'
const app = express()

process.title = 'AddVenue'

app.use(express.json())

app.use(cors())

// const database = 

// post user input from form submission to postgresql table
app.post('/addvenue', (request, response) => {
    const name  = request.body.venue
    const capacity = request.body.capacity
    const address = request.body.address
    const geolocation = request.body.geolocation
    const image = request.body.image
    const email = request.body.email 
    const start_date = request.body.startDate 
    const end_date = request.body.endDate  
    
    // try {
    //     database.query(
    //     'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date) RETURNING venue_id',
    //     [name, capacity, address, geolocation, image, email, start_date, end_date]      
    //     )
    //     response.status(200)
    //     return response.send('success')
    // }

    // catch { 
    //     response.status(500)
    //     return response.send('failure')
    // }
})