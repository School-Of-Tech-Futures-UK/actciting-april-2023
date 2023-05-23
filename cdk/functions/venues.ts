import client = require('data-api-client')

// const connection = client({
//   secretArn:  'arn:aws:secretsmanager:eu-west-2:645438430936:secret:rdsclusterSecret5F22C2CE-p8xEcaDMv252-xYLNp0',
//   resourceArn: 'arn:aws:rds:eu-west-2:645438430936:cluster:actsent-stack-rdscluster9d572005-rf41aba7zoc9',
//   database: 'dev'
// })
export type VenueData = {
  venueId: number,
  name: string,
  capacity: number,
  address: string,
  geolocation: string,
  image: string,
  email: string,
  start_date: number,
  end_date: number
}

const connection = client({
  secretArn: process.env.SECRET_ARN || 'NOT_SET',
  resourceArn: process.env.CLUSTER_ARN || 'NOT_SET',
  database: process.env.DATABASE_NAME || 'NOT_SET'
})

export const getVenues = async () => {
  console.log('getVenues() called')
  try {
    const results = await connection.query(
      'SELECT * FROM venues ORDER BY venue_id ASC;'
    )
    return results.records
  } catch (err) {
    console.log('error', err)
    throw err
  }
}

export const getVenueById = async (venue_id:number) => {

  try {
    const results = await connection.query(
      'SELECT * FROM venues WHERE venue_id = :venue_id;',
      {venue_id}
    )
  
    return results.records
  
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const createVenue = async (venueData: VenueData) => {

 
  try {
    const results = await connection.query(

      'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date )) '+ ' VALUES (name:, capacity:, address:, geolocation:, image:, email:, start_date:, end_date:) RETURNING *;',
      {...venueData}
    )
    const message = `createVenue: venue added with ID: ${results.records[0].venue_id}`
    console.log(message)
    return(message)
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const updateVenue = async (venueData:VenueData) => {

  try {
    const results = await connection.query(
        
      'UPDATE venues SET (name, capacity, address, geolocation, image, email, start_date, end_date )) '+ ' VALUES (name:, capacity:, address:, geolocation:, image:, email:, start_date:, end_date:) RETURNING *;',
      {...venueData}
    )
    const message = `updateVenue: modified with ID: ${results.records[0].venue_id}`
    console.log(message)
    return(message)
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const deleteVenue = async (venue_id: number) => {

  try {
    const results = await connection.query(
      'DELETE FROM venues WHERE venue_id = :venue_id:;',
      {venue_id}
    )
    const message = `deleteVenue: venue deleted with ID: ${results.records[0].venue_id}`
    console.log(message)
    return(message)
  
  } catch (error) {
    console.log('error', error)
    throw error
  }
}
  
