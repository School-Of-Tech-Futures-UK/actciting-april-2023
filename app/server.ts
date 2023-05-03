// Express app
import express from 'express'
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
app.get('/venues', dbHelper.getVenues)
app.get('/venue/:id', dbHelper.getVenueById)
app.post('/venues', dbHelper.createVenue)
app.put('/venue/:id', dbHelper.updateVenue)
app.delete('/venue/:id', dbHelper.deleteVenue)

// Activate!
app.listen(port, () => {
  console.log(`App running on port ${port} as process ${process.title}`)
})
