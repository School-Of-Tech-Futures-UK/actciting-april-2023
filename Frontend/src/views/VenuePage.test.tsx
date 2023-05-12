import React from 'react'
import { act, fireEvent, prettyDOM, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VenuePage from './VenuePage'
import '@testing-library/jest-dom/extend-expect'



describe('Button functionality', () => {

    //create test form hidden when page rendered 
    it('Log on page and form is hidden', () => {
        //Arrange
        render(<VenuePage/>)

        const venueForm = screen.getByTestId('venueForm' )

        //Assert
        expect(venueForm).toHaveClass('hide')
    })

    //2nd test
    it('Clicking button should list all inputs', () =>{
        //Arrange 
        render(<VenuePage/>)
        //Act
        const button= screen.getByText('Add Venue')
        fireEvent.click(button);

        const venueForm = screen.getByTestId('venueForm' )
        //Assert
        expect(venueForm).toHaveClass('show')

    })
    //3rd test
    it('Clicking button again should hide all inputs', () => {
        //Arrange
        render(<VenuePage/>)
        //Act
        const button= screen.getByText('Add Venue')
        fireEvent.click(button);
        fireEvent.click(button); //clicked twice

        const venueForm = screen.getByTestId('venueForm' )
        //Assert
        expect(venueForm).toHaveClass('hide')
    })
})

describe('Adding Venue Functionality', () => {

    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve()} as Response))
    })

    it('Should add a new venue to the page', () => {
        render(<VenuePage/>)
        const venueNameInput = screen.getByTestId('venueName')
        const venueCapacityInput = screen.getByTestId('venueCapacity')
        const venueAddressInput = screen.getByTestId('venueAddress')
        const venueGeolocationInput = screen.getByTestId('venueGeolocation')
        const venueEmailInput = screen.getByTestId('venueEmail')
        const venueStartDateInput = screen.getByTestId('venueStartDate')
        const venueEndDateInput = screen.getByTestId('venueEndDate')

        const addVenueButton= screen.getByText('Add Venue')
        const submitButton= screen.getByText('Submit')

        fireEvent.click(addVenueButton);
        userEvent.type(venueNameInput, "Venue A")
        userEvent.type(venueCapacityInput, "10")
        userEvent.type(venueAddressInput, "1 Test Address")
        userEvent.type(venueGeolocationInput, "55.55, 55.55")
        userEvent.type(venueEmailInput, "test@test.test")
        userEvent.type(venueStartDateInput, "12052023")
        userEvent.type(venueEndDateInput, "12052023")
        fireEvent.click(submitButton)
        
        expect(fetch).toHaveBeenCalledTimes(2)
        expect(fetch).toHaveBeenLastCalledWith(
            expect.stringContaining('http://localhost:3000/venues'),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    name: 'Venue A',
                    capacity: "10",
                    address: "1 Test Address",
                    geolocation: "55.55, 55.55",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP2sN2qKTb-4beqF1zFeMWGCP3vW-Ih1X2o4QfE=w426-h240-k-no", // placeholder image
                    email: "test@test.test",
                    start_date: "12052023",
                    end_date: "12052023",
                })
            })
        )
    })
})

