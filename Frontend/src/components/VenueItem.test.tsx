import React from 'react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import VenueItem from './VenueItem'

const venueItem = {
    venue_id: 1,
    name: 'Venue A',
    capacity: 10,
    address: 'Address 1',
    geolocation: '55.55, 55.55',
    image: 'https://exampleimage.com/image.jpg',
    email: 'email@test.com',
    start_date: 22022023,
    end_date: 23022023
}

describe('The Venue Item', () => {
    it('should have correct information in VenueItem', () => {
        render(<VenueItem key={venueItem.venue_id} venueId={venueItem.venue_id} name={venueItem.name} capacity={venueItem.capacity}
            address={venueItem.address} geolocation={venueItem.geolocation} image={venueItem.image}
            email={venueItem.email} startDate={venueItem.start_date} endDate={venueItem.end_date}/>);

        const venueName = screen.getByText(/Venue A/);
        const venueCapacity = screen.getByText(/10/);
        const venueAddress = screen.getByText(/Address 1/);
        const venueImage = screen.getByAltText(/Venue A/);
        const venueEmail = screen.getByText(/email@test.com/);
        const venueStartDate = screen.getByText(/22022023/);
        const venueEndDate = screen.getByText(/23022023/);

        expect(venueName).toBeInTheDocument();
        // expect(venueCapacity).toBeInTheDocument();
        // expect(venueAddress).toBeInTheDocument();
        // expect(venueImage).toBeInTheDocument();
        // expect(venueEmail).toBeInTheDocument();
        // expect(venueStartDate).toBeInTheDocument();
        // expect(venueEndDate).toBeInTheDocument();
    })
})