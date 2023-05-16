// Express app
import express from 'express'
import { Request, Response } from 'express'
import * as dbHelper from './database-helper'
import cors from 'cors'
const app = express()
const port = 3000

// Have a title on the process to help us stop it - see package.json
process.title = 'MyExpressApp'

// This lets us handle JSON directly
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Use Cors
app.use(cors())

// Hello-world type root url
app.get('/', (request, response) => {
  response.json({ info: 'Postgres and Express sample' })
})

// API urls code here
app.get('/venues', async (request: Request, response: Response) => {
  console.log('GET getVenues/');

  try{
    const venues = await dbHelper.getVenues();
    response.status(200).json(venues)
  } catch (err){
    console.log('Error thrown in getVenues: ', (err as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
});


app.get('/venue/:id', async (request: Request, response: Response) => {
  console.log('GET getVenuesById/');
  const venue_id = parseInt(request.params.id)
  console.log(`getVenueById: venue_id=${venue_id}`)
  try{
    const venueById = await dbHelper.getVenueById(venue_id);
    response.status(200).json(venueById)
  } catch (err){
    console.log('Error thrown in getVenues: ', (err as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
});


//app.get('/venue/:id', dbHelper.getVenueById)
app.post('/venues', async (request: Request, response: Response) => {
  const { name, capacity, address, geolocation, image, email, start_date, end_date } = request.body
  console.log(`createVenue: name=${name}, capacity=${capacity}, address=${address}, geolocation=${geolocation}, image=${image}, email=${email}, start_date=${start_date}, end_date=${end_date}`)
  try{
    const result = await dbHelper.createVenue(name, capacity, address, geolocation, image, email, start_date, end_date);
    response.status(200).json(result)
  }
  catch(error){
    console.log('Error thrown in createVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }

});



app.put('/venue/:id', async (request: Request, response: Response) => {
  const venue_id = parseInt(request.params.id)
  const { name, capacity, address, geolocation, image, email, start_date, end_date } = request.body
  console.log(`updateVenue: venue_id=${venue_id}`)

  try{
    const result = dbHelper.updateVenue(name, capacity, address, geolocation, image, email, start_date, end_date, venue_id)
    response.status(200).json(result)
  }

  catch(error){
    console.log('Error thrown in update Venue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }


});

app.delete('/venue/:id', async (request: Request, response: Response) => {
  const venue_id = parseInt(request.params.id)
  console.log(`deleteVenue: venue_id=${venue_id}`)

  try{
    const result = dbHelper.deleteVenue(venue_id)
    response.status(200).json(result)
  }
  catch(error){
    console.log('Error thrown in delete Venue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }

});



app.get('/gigs', dbHelper.getGigs)
app.get('/gig/:id', dbHelper.getGigById)
app.get('/gigs-by-venue/:id', dbHelper.getGigsByVenue)
app.put('/gig-approve/:id', dbHelper.gigApprove)
app.put('/gig-deny/:id', dbHelper.gigDeny)


// Activate!
app.listen(port, () => {
  console.log(`App running on port ${port} as process ${process.title}`)
})
