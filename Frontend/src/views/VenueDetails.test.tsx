import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VenueDetails from './VenueDetails'
import '@testing-library/jest-dom/extend-expect'
import { once } from 'events'

//test UI when someone clicks delete - sends HTTP request and mock out the call to the database
describe('DeleteButton', () => {

   beforeEach(() => {
      jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve()} as Response)) 
   })

   it('when delete button clicked, send a HTTP delete request', () => {
        //Arrange
        render(<VenueDetails/>)
        const deleteButton = screen.getByText('Delete')
        fireEvent.click(deleteButton)
        
        //validate that the mock has received the request 
        //Assert
        expect(fetch).toHaveBeenCalledTimes(2);

        expect(fetch).toHaveBeenLastCalledWith(
         expect.stringContaining('http://localhost:3000/venue'),
         expect.objectContaining({
            method: 'DELETE'
         }))
    })
  
  })