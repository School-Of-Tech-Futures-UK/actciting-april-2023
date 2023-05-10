import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom/extend-expect'

import VenueList from './VenueList'

const venues = [
    {
        venue_id: 1,
        name: 'Venue A',
        capacity: 10,
        address: 'Address 1',
        geolocation: '55.55, 55.55',
        image: 'https://exampleimage.com/image.jpg',
        email: 'email@test.com',
        start_date: 22022023,
        end_date: 23022023
    },
    {
        venue_id: 2,
        name: 'Venue B',
        capacity: 10,
        address: 'Address 2',
        geolocation: '44.44, 44.44',
        image: 'https://exampleimage.com/image2.jpg',
        email: 'email2@test.com',
        start_date: 10012023,
        end_date: 11012023
    }
]

describe('List of Venues', () => {
    it('should render all venues on screen', () => {
        const {container} = render(<VenueList venueArray={venues}/>);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const venuesList = container.getElementsByClassName('venueItem');

        expect(venuesList.length).toBe(2)
    })
})