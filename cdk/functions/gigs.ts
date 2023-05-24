import client = require('data-api-client')

// const connection = client({
//   secretArn:  'arn:aws:secretsmanager:eu-west-2:645438430936:secret:rdsclusterSecret5F22C2CE-p8xEcaDMv252-xYLNp0',
//   resourceArn: 'arn:aws:rds:eu-west-2:645438430936:cluster:actsent-stack-rdscluster9d572005-rf41aba7zoc9',
//   database: 'dev'
// })

const connection = client({
  secretArn: process.env.SECRET_ARN || 'NOT_SET',
  resourceArn: process.env.CLUSTER_ARN || 'NOT_SET',
  database: process.env.DATABASE_NAME || 'NOT_SET'
})

export const getGigs = async () => {
  console.log('getGigs() called')
  try {
    const results = await connection.query(
      'SELECT * FROM venue_requests ORDER BY request_id ASC;'
    )
    return results.records
  } catch (err) {
    console.log('error', err)
    throw err
  }
}

export const getGigById = async (request_id:number) => {

  try {
    const results = await connection.query(
      'SELECT * FROM venue_requests WHERE request_id = :request_id;',
      {request_id}
    )
  
    return results.records
  
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const getGigsByVenue = async (request_id:number) => {

  try {
    const results = await connection.query(
      'SELECT venue_requests.*, events.* FROM venue_requests JOIN events on venue_requests.event_id = events.event_id WHERE venue_requests.venue_id = :request_id ;',
      {request_id}
    )
  
    return results.records
  
  } catch (error) {
    console.log('error', error)
    throw error
  }
}



export const gigApprove = async (request_id: number) => {

  try {
    const results = await connection.query(
        
      'UPDATE venue_requests SET approval_status = true WHERE request_id=:request_id ;',
      {request_id}
    )
    const message = `gigApproved: modified with ID: ${results.records}`
    console.log(message)
    return(message)
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const gigDeny = async (request_id: number) => {

  try {
    const results = await connection.query(
        
      'UPDATE venue_requests SET approval_status = false WHERE request_id=:request_id ;',
      {request_id}
    )
    const message = `gigDenied: modified with ID: ${results.records}`
    console.log(message)
    return(message)
  } catch (error) {
    console.log('error', error)
    throw error
  }
}


  
