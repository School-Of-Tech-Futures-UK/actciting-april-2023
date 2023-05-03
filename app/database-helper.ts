import { Pool } from 'pg'
import { Request, Response } from 'express'

const dbServer = process.env.POSTGRES_DB
const dbPassword = process.env.POSTGRES_PASSWORD

console.log(`Create pool with defaults: server='${dbServer}'`)
const pool = new Pool({
  host: dbServer,
  database: 'postgres',
  user: 'postgres',
  password: dbPassword,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
})

export const getVenues = async (request: Request, response: Response) => {
  console.log('getVenues')

  try {
    const results = await pool.query(
      'SELECT * FROM venues ORDER BY venue_id ASC;'
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getVenues: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const getVenueById = async (request: Request, response: Response) => {
  const Venue_id = parseInt(request.params.id)
  console.log(`getVenueById: venue_id=${Venue_id}`)

  try {
    const results = await pool.query(
      'SELECT * FROM venues WHERE venue_id = $1;',
      [Venue_id]
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getVenueById: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const createVenue = async (request: Request, response: Response) => {
  const { name, capacity, address, geolocation, image, email, start_date, end_date } = request.body
  console.log(`createVenue: name=${name}, capacity=${capacity}, address=${address}, geolocation=${geolocation}, image=${image}, email=${email}, start_date=${start_date}, end_date=${end_date}`)

  try {
    const results = await pool.query(
      'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date) VALUES ($1-$8) RETURNING venue_id;',
      [name, capacity, address, geolocation, image, email, start_date, end_date ]
    )
    const message = `createVenue: Venue added with ID: ${results.rows[0].venue_id}`
    console.log(message)
    response.status(201).send(message)
  } catch (error) {
    console.log('Error thrown in createVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const updateVenue = async (request: Request, response: Response) => {
  const Venue_id = parseInt(request.params.id)
  const { first_name, surname } = request.body
  console.log(`updateVenue: Venue_id=${Venue_id}`)

  try {
    const results = await pool.query(
      'UPDATE Venue SET first_name = $1, surname = $2 WHERE Venue_id = $3;',
      [first_name, surname, Venue_id]
    )
    const message = `updateVenue: modified with ID: ${Venue_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in updateVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const deleteVenue = async (request: Request, response: Response) => {
  const Venue_id = parseInt(request.params.id)
  console.log(`deleteVenue: Venue_id=${Venue_id}`)

  try {
    const results = await pool.query(
      'DELETE FROM Venue WHERE Venue_id = $1;',
      [Venue_id]
    )
    const message = `deleteVenue: Venue deleted with ID: ${Venue_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in deleteVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}