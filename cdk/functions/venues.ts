import client from 'data-api-client'
const connection = client({
  secretArn:  'arn:aws:secretsmanager:eu-west-2:645438430936:secret:rdsclusterSecret5F22C2CE-p8xEcaDMv252-xYLNp0',
  resourceArn: 'arn:aws:rds:eu-west-2:645438430936:cluster:actsent-stack-rdscluster9d572005-rf41aba7zoc9',
  database: 'actsent-stack-rdscluster9d572005-rf41aba7zoc9'
})

export const getVenues = async () => {
    console.log('getVenues() called');
    try {
      const results = await connection.query(
        'SELECT * FROM venues ORDER BY venue_id ASC;'
      )
      return results.rows;
    } catch (err) {
      throw err;
    }
  }

  export const getVenueById = async (venue_id:any) => {

    try {
      const results = await connection.query(
        'SELECT * FROM venues WHERE venue_id = venue_id;',
        {venue_id}
      )
  
      return results.rows;
  
    } catch (error) {
      throw error
    }
  }

  export const createVenue = async (venueData:any) => {

 
    try {
      const results = await connection.query(

        'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date )) '+ ' VALUES (name:, capacity:, address:, geolocation:, image:, email:, start_date:, end_date:) RETURNING *;',
        {...venueData}
      )
      const message = `createVenue: venue added with ID: ${results.rows[0].venue_id}`
      console.log(message)
      return(message)
    } catch (error) {
      throw error
    }
  }

  export const updateVenue = async (venueData:any) => {

    try {
      const results = await connection().query(
        
        'UPDATE venues SET (name, capacity, address, geolocation, image, email, start_date, end_date )) '+ ' VALUES (name:, capacity:, address:, geolocation:, image:, email:, start_date:, end_date:) RETURNING *;',
        {...venueData}
      )
      const message = `updateVenue: modified with ID: ${results.rows[0].venue_id}`
      console.log(message)
      return(message)
    } catch (error) {
      throw error
    }
  }

  export const deleteVenue = async (venue_id: any) => {

    try {
      const results = await connection().query(
        'DELETE FROM venues WHERE venue_id = :venue_id:;',
        {venue_id}
      )
      const message = `deleteVenue: venue deleted with ID: ${results.rows[0].venue_id}`
      console.log(message)
      return(message)
  
    } catch (error) {
      throw error
    }
  }
  