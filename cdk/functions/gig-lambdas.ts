import {
    checkKeys,
    timestampText,
    responseToApiGw,
    responseToApiGwWithError,
    LambdaResult,
    LambdaEvent,
  } from './common'
  
  import {
      getGigs,
      getGigById,
      getGigsByVenue,
      gigApprove,
      gigDeny,

  } from './gigs'
  
  
  export const healthcheck = async (): LambdaResult => responseToApiGw(200, 'API is OK')

  export const getGigsHandler = async (): LambdaResult => {
      console.log('GET gigs/');
    
      try{
        const Gigs = await getGigs();
  
        return responseToApiGw(200, Gigs)
      } catch (error){
        console.log('Error thrown in getGigs: ', error)
        return responseToApiGw(500, 'Error getting Gigs')
      }
    };
    
  export const getGigByIdHandler = async (event: LambdaEvent): LambdaResult => {
      console.log('GET gigs/id:');
  
      const urlParams = event.pathParameters || {}
      const gig_id = urlParams.gig_id || '-1'
  
      console.log(`getGigById: Gig_id=${gig_id}`)
      try{
        const gigById = await getGigById(gig_id);
        return responseToApiGw(200, gigById)
  
      } catch (error){
          console.log('Error thrown in getGigById: ', error)
          return responseToApiGw(500, 'Error getting a Gig')
      }
  };
  
  export const getGigsByVenueHandler = async (event: LambdaEvent): LambdaResult => {
    console.log('GET gigs-by-venue/id:');

    const urlParams = event.pathParameters || {}
    const gig_id = urlParams.gig_id || '-1'

    console.log(`getGigById: Gig_id=${gig_id}`)
    try{
      const gigsByVenue = await getGigsByVenue(gig_id);
      return responseToApiGw(200, gigsByVenue)

    } catch (error){
        console.log('Error thrown in getGigsByVenue: ', error)
        return responseToApiGw(500, 'Error getting Gigs by venue')
    }
};
  
  export const gigApproveHandler = async (event: LambdaEvent): LambdaResult => {
      console.log('PUT gig-approve/id:');
      const urlParams = event.pathParameters || {}
      const gig_id = urlParams.gig_id || '-1'
      try{
        const gigApproval = await gigApprove(gig_id);
        return responseToApiGw(200, gigApproval)
  
      }
      catch(error){
          console.log('Error thrown in gigApprove: ', error)
          return responseToApiGw(500, 'Error while approving gig')
      }
      };
  
      export const gigDenyeHandler = async (event: LambdaEvent): LambdaResult => {
        console.log('PUT gig-deny/id:');
        const urlParams = event.pathParameters || {}
        const gig_id = urlParams.gig_id || '-1'
        try{
          const gigDenial = await gigDeny(gig_id);
          return responseToApiGw(200, gigDenial)
    
        }
        catch(error){
            console.log('Error thrown in gigDeny: ', error)
            return responseToApiGw(500, 'Error while denying gig')
        }
        };
