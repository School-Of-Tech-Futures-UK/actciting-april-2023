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
    const venue_id = urlParams.venue_id || '-1'

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
    console.log('POST venue/id:');
    try{
        const postDataText = event.body || '{}'
        const postDataJson = JSON.parse(postDataText)
        const postResponse = await createVenue(postDataJson)
        const result = responseToApiGw(200, postResponse)
        return result
  
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
        const venue_id = urlParams.venue_id || '-1'
    
        console.log(`getVenueById: venue_id=${venue_id}`)
        try{
          const venueById = await deleteVenue(venue_id);
          return responseToApiGw(200, venueById)
    
        } catch (error){
            console.log('Error thrown in deleteVenue: ', error)
            return responseToApiGw(500, 'Error when deleting a venue ')
        }
        };