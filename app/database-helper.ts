import { createPool } from './connection'
import { Request, Response } from 'express'

const dbServer = process.env.POSTGRES_DB
const dbPassword = process.env.POSTGRES_PASSWORD

console.log(`Create pool with defaults: server='${dbServer}'`)

export const getVenues = async () => {
  console.log('getVenues() called');
  try {
    const results = await createPool().query(
      'SELECT * FROM venues ORDER BY venue_id ASC;'
    )
    return results.rows;
  } catch (err) {
    throw err;
  }
}

// export const getVenues = async (request: Request, response: Response) => {
//   console.log('getVenues')

//   try {
//     const results = await pool.query(
//       'SELECT * FROM venues ORDER BY venue_id ASC;'
//     )
//     response.status(200).json(results.rows)
//   } catch (error) {
//     console.log('Error thrown in getVenues: ', (error as Error).message)
//     response.status(500).json({ message: 'There was an error' })
//   }
// }


export const getVenueById = async (venue_id:any) => {

  try {
    const results = await createPool().query(
      'SELECT * FROM venues WHERE venue_id = $1;',
      [venue_id]
    )
    return results
  } catch (error) {
    throw error
  }
}

export const createVenue = async (request: Request, response: Response) => {
  const { name, capacity, address, geolocation, image, email, start_date, end_date } = request.body
  console.log(`createVenue: name=${name}, capacity=${capacity}, address=${address}, geolocation=${geolocation}, image=${image}, email=${email}, start_date=${start_date}, end_date=${end_date}`)

  try {
    const results = await createPool().query(
      'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING venue_id;',
      [name, capacity, address, geolocation, image, email, start_date, end_date ]
    )
    const message = `createVenue: venue added with ID: ${results.rows[0].venue_id}`
    console.log(message)
    response.status(201).send(message)
  } catch (error) {
    console.log('Error thrown in createVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const updateVenue = async (request: Request, response: Response) => {
  const venue_id = parseInt(request.params.id)
  const { name, capacity, address, geolocation, image, email, start_date, end_date } = request.body
  console.log(`updateVenue: venue_id=${venue_id}`)

  try {
    const results = await createPool().query(
      // 'UPDATE venues SET (name, capacity, address, geolocation, image, email, start_date, end_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING venue_id;'
      'UPDATE venues SET name = $1, capacity = $2, address=$3, geolocation=$4, image=$5, email=$6, start_date=$7, end_date=$8 WHERE venue_id = $9;',
      [name, capacity, address, geolocation, image, email, start_date, end_date, venue_id ]
    )
    const message = `updateVenue: modified with ID: ${venue_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in updateVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const deleteVenue = async (request: Request, response: Response) => {
  const venue_id = parseInt(request.params.id)
  console.log(`deleteVenue: venue_id=${venue_id}`)

  try {
    const results = await createPool().query(
      'DELETE FROM venues WHERE venue_id = $1;',
      [venue_id]
    )
    const message = `deleteVenue: venue deleted with ID: ${venue_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in deleteVenue: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}
