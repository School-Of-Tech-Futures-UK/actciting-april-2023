import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VenueDetails from './VenueDetails'
import '@testing-library/jest-dom/extend-expect'
import { once } from 'events'

//test UI when someone clicks delete - sends HTTP request and mock out the call to the database
describe('DeleteButton', () => {

    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve()} as Response)) 
 
 it('testing the mock config', async () => {
 const results = await fetch('http://www.example.com')
 const data = await results.json()
 
 expect(fetch).toHaveBeenCalledTimes(1)
 expect(fetch).toHaveBeenLastCalledWith('http://www.example.com')
 })
    // jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve()} as Response)) 

    // it('testing the mock config', async () => {
    //   const results = await fetch('http://www.example.com')
    //   const data = await results.json()

    //   expect(fetch).toHaveBeenCalledTimes(1)
    //   expect(fetch).toHaveBeenLastCalledWith('http://www.example.com')
    // })
    
    // it('when delete button clicked, send a HTTP delete request', () => {
    //     //Arrange
    //     render(<VenueDetails/>)
    //     const deleteButton = screen.getByText('Delete')
    //     fireEvent.click(deleteButton)
        
    //     //validate that the mock has received the request 
    //     //Assert
    //     expect(fetch).toHaveBeenCalledTimes(1);

    //     const firstCall = (fetch as jest.Mock).mock.calls[0]
    //     const requestProperties = firstCall[1]

    //     expect(requestProperties).toBe(expect.objectContaining({
    //       method: 'DELETE'
    //     }))
    // })
  
  })