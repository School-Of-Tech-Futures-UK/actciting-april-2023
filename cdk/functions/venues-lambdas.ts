import {
  checkKeys,
  timestampText,
  responseToApiGw,
  responseToApiGwWithError,
  LambdaResult,
  LambdaEvent,
} from './common'

import {
    getVenues,
    getVenueById,
    createVenue,
    updateVenue,
    deleteVenue
} from './venues'

export type VenueItemProps = {
  name: string,
  capacity: number,
  address: string,
  geolocation: string,
  image: string,
  email: string,
  startDate: number,
  endDate: number
}


export const healthcheck = async (): LambdaResult => responseToApiGw(200, 'API is OK')

export const getVenuesHandler = async (): LambdaResult => {
    console.log('GET venues/');
  
    try{
      const venues = await getVenues();

      return responseToApiGw(200, venues)
    } catch (error){
      console.log('Error thrown in getVenues: ', error)
      return responseToApiGw(500, 'Error getting venues')
    }
  };
  
export const getVenueByIdHandler = async (event: LambdaEvent): LambdaResult => {
    console.log('GET venue/id:');

    const urlParams = event.pathParameters || {}
    const venue_id = Number(urlParams.venue_id)|| '-1'

    console.log(`getVenueById: venue_id=${venue_id}`)
    try{
      const venueById = await getVenueById(venue_id);
      return responseToApiGw(200, venueById)

    } catch (error){
        console.log('Error thrown in getVenueById: ', error)
        return responseToApiGw(500, 'Error getting a venue')
    }
};

export const createVenueHandler = async (event: LambdaEvent): LambdaResult => {
    console.log('POST venues/');
    try{
        const postDataText = event.body || '{}'
        const postDataJson = JSON.parse(postDataText) 
        let isValid = true
        let test = "eroor message"
        if (postDataJson.name === undefined || postDataJson.name.length === 0){isValid=false;test+="name" }
        if (postDataJson.capacity ===undefined|| Number.isNaN(parseInt(postDataJson.capacity))){isValid=false;test+="capacity"}     
        if ( postDataJson.address ===undefined|| postDataJson.address.length === 0){isValid=false;test+="address"}
        if ( postDataJson.geolocation ===undefined|| postDataJson.geolocation.length === 0){isValid=false;test+="geolocation"}
        if ( postDataJson.image===undefined|| postDataJson.image.length === 0){isValid=false;test+="image"}
        if ( postDataJson.email ===undefined || postDataJson.email.length === 0){isValid=false;test+="email"}
        if ( postDataJson.start_date===undefined|| Number.isNaN(parseInt(postDataJson.start_date))){isValid=false;test+="Startdate"}
        if ( postDataJson.end_date ===undefined|| Number.isNaN(parseInt(postDataJson.end_date))){isValid=false;test+="enddATE"}
        console.log(test,isValid)
        const parsedData = {
          name: postDataJson.name,
          capacity: Number(postDataJson.capacity),
          address: postDataJson.address,
          geolocation: postDataJson.geolocation,
          image : postDataJson.image,
          email: postDataJson.email,
          start_date: Number(postDataJson.start_date),
          end_date: Number(postDataJson.end_date)}
        if (isValid){
          const postResponse = await createVenue(parsedData)
          const result = responseToApiGw(200, postResponse)
          return result
        }else{
         return responseToApiGw(400, test)}


        
    }
    catch(error){
      console.log('Error thrown in createVenue: ', error)
      return responseToApiGw(500, 'Error getting creating venue')
    }
  };

export const updateVenueHandler = async (event: LambdaEvent): LambdaResult => {
    console.log('PUT venue/id:');
    try{
        const postDataText = event.body || '{}'
        const postDataJson = JSON.parse(postDataText)
        const postResponse = await updateVenue(postDataJson)
        const result = responseToApiGw(200, postResponse)
        return result

    }
    catch(error){
        console.log('Error thrown in updateVenue: ', error)
        return responseToApiGw(500, 'Error getting updating venue')
    }
    };

    export const deleteVenueHandler = async (event: LambdaEvent): LambdaResult => {
        console.log('DELETE venue/id:');

        const urlParams = event.pathParameters || {}
        const venue_id = Number(urlParams.venue_id)|| '-1'
    
        console.log(`getVenueById: venue_id=${venue_id}`)
        try{
          const venueById = await deleteVenue(venue_id);
          return responseToApiGw(200, venueById)
    
        } catch (error){
            console.log('Error thrown in deleteVenue: ', error)
            return responseToApiGw(500, 'Error when deleting a venue ')
        }
        };