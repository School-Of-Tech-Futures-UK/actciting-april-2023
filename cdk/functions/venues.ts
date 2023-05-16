
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
        'SELECT * FROM venues WHERE venue_id = $1;',
        [venue_id]
      )
  
      return results.rows;
  
    } catch (error) {
      throw error
    }
  }

  export const createVenue = async (venueData:any) => {

 
    try {
      const results = await connection.query(
        'INSERT INTO venues (name, capacity, address, geolocation, image, email, start_date, end_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING venue_id;',
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
        
        'UPDATE venues SET name = $1, capacity = $2, address=$3, geolocation=$4, image=$5, email=$6, start_date=$7, end_date=$8 WHERE venue_id = $9;',
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
        'DELETE FROM venues WHERE venue_id = $1;',
        [venue_id]
      )
      const message = `deleteVenue: venue deleted with ID: ${results.rows[0].venue_id}`
      console.log(message)
      return(message)
  
    } catch (error) {
      throw "error here"
    }
  }
  