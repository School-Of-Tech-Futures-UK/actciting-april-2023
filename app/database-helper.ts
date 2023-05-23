import { createPool } from './connection'
import { Request, Response } from 'express'

const dbServer = process.env.POSTGRES_DB

console.log(`Create pool with defaults: server='${dbServer}'`)

export const getVenues = async () => {
  console.log('getVenues() called')
  try {
    const results = await createPool().query(
      'SELECT * FROM venues ORDER BY venue_id ASC;'
    )
    return results.rows
  } catch (err) {
    console.log('error was caught', err)
    throw err
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


export const getVenueById = async (venue_id:number) => {

  try {
    const results = await createPool().query(
      'SELECT * FROM venues WHERE venue_id = $1;',
      [venue_id]
    )

    return results.rows

  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const createVenue = async (name:string, capacity:number, address:string, geolocation:string, image:string, email:string, start_date:number, end_date:number) => {
 
 
  try {
    const results = await createPool().query(

      'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING venue_id;',
      [name, capacity, address, geolocation, image, email, start_date, end_date ]

    )
    const message = `createVenue: venue added with ID: ${results.rows[0].venue_id}`
    console.log(message)
    return(message)

  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const updateVenue = async (name:string, capacity:number, address:string, geolocation:string, image:string, email:string, start_date:number, end_date:number, venue_id:number) => {

  try {
    await createPool().query(
      
      'UPDATE venues SET name = $1, capacity = $2, address=$3, geolocation=$4, image=$5, email=$6, start_date=$7, end_date=$8 WHERE venue_id = $9;',
      [name, capacity, address, geolocation, image, email, start_date, end_date, venue_id ]
    )
    const message = `updateVenue: modified with ID: ${venue_id}`
    console.log(message)
    return(message)
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const deleteVenue = async (venue_id: number) => {

  try {
    await createPool().query(
      'DELETE FROM venues WHERE venue_id = $1;',
      [venue_id]
    )
    const message = `deleteVenue: venue deleted with ID: ${venue_id}`
    console.log(message)
    return(message)

  } catch (error) {
    throw 'error here'
  }
}

export const getGigs= async (request: Request, response: Response) => {
  console.log('getGigs')

  try {
    const results = await createPool().query(
      'SELECT * FROM gig_requests ORDER BY gig_id ASC;'
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getGigs: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const getGigById = async (request: Request, response: Response) => {
  const gig_id = parseInt(request.params.id)
  console.log(`getGigById: gig_id=${gig_id}`)

  try { 
    const results = await createPool().query(
      'SELECT * FROM gig_requests WHERE gig_id = $1;',
      [gig_id]
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getGigById: ', (error as Error).message)
    response.status(500).json((error as Error).message)
  }
}

export const getGigsByVenue = async (request: Request, response: Response) => {

  const gig_id = parseInt(request.params.id)
  console.log(`getGigById: gig_id=${gig_id}`)

  try { 
    const results = await createPool().query(
      'SELECT * FROM gig_requests WHERE venue_id = $1;',
      [gig_id]
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getGigById: ', (error as Error).message)
    response.status(500).json((error as Error).message)
  }
}

export const gigApprove = async (request: Request, response: Response) => {
  const gig_id = parseInt(request.params.id)
  console.log(`gigApprove: gig_id=${gig_id}`)

  try {
    await createPool().query(

      'UPDATE gig_requests SET approval_status = true WHERE gig_id = $1;',
      [gig_id]
    )
    const message = `updateGig: modified with ID: ${gig_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in gigApprove ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const gigDeny = async (request: Request, response: Response) => {
  const gig_id = parseInt(request.params.id)
  console.log(`GigDeny: gig_id=${gig_id}`)

  try {
    await createPool().query(

      'UPDATE gig_requests SET  approval_status = false WHERE gig_id = $1;',
      [gig_id]
    )
    const message = `updateGig: modified with ID: ${gig_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in Deny ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}
