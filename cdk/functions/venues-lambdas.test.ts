import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { createVenueHandler } from './venues-lambdas'


describe('venues lambddas', ()=> {
  it('create venue handler should reject invalid inputs',async() =>{
        
    const event= {body:''}

    const response  =await createVenueHandler(event as APIGatewayProxyEventV2)

    expect((response as APIGatewayProxyStructuredResultV2).statusCode).toEqual(400)

  }
    
  )



  it('create venue handler should reject invalid inputs',async() =>{
    const details = {name: 56,
      capacity: 10,
      address: 'fenchurch',
      geolocation: 'somewhere',
      image: 'image',
      email: 'email@email',
      startDate: 2011,
      endDate: 2022}
    const event= {body: JSON.stringify(details)}

    const response  =await createVenueHandler(event as APIGatewayProxyEventV2)

    expect((response as APIGatewayProxyStructuredResultV2).statusCode).toEqual(400)

  }

  )

  it('create venue handler should reject invalid inputs',async() =>{
    const details = {name: 'john',
      capacity: 10,
      address: 'fenchurch',
      geolocation: 'somewhere',
      image: 'image',
      email: 'email@email',
      startDate: 2011,
      endDate: 2022}
    const event= {body: JSON.stringify(details)}

    const response  =await createVenueHandler(event as APIGatewayProxyEventV2)

    expect((response as APIGatewayProxyStructuredResultV2).statusCode).toEqual(400)

  }

  )

  it('create venue handler should reject invalid inputs',async() =>{
    const details = {name: 'john',
      capacity: 10,
      address: 'fenchurch',
      geolocation: 'somewhere',
      image: 'image',
      email: '',
      startDate: 2011,
      endDate: 2022}
    const event= {body: JSON.stringify(details)}

    const response  =await createVenueHandler(event as APIGatewayProxyEventV2)

    expect((response as APIGatewayProxyStructuredResultV2).statusCode).toEqual(400)

  }

  )

  it('create venue handler should reject invalid inputs for empty string on number fields',async() =>{
    const details = {name: 'john',
      capacity: 10,
      address: 'fenchurch',
      geolocation: 'somewhere',
      image: 'image',
      email: 'bhdfghs',
      startDate: '',
      endDate: 2022}
    const event= {body: JSON.stringify(details)}

    const response  =await createVenueHandler(event as APIGatewayProxyEventV2)

    expect((response as APIGatewayProxyStructuredResultV2).statusCode).toEqual(400)

  }

  )

}
)
