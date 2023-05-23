import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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

