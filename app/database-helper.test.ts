// import * as dbHelper from './database-helper';
import { getVenues, getVenueById } from './database-helper'
import { createPool } from './connection'
// import request from "express";
jest.mock('./connection')
const mockedCreatePool = createPool as jest.Mock



describe('database-helper tests', () => {
  describe('getVenues', () => {
    it('returns a list of venues', async () => {
      const fakeQueryFn: jest.Mock = jest.fn()
      // change this to match database schema
      const mockVenue = {
        venueName: 'O2 Academy',
      }
      fakeQueryFn.mockReturnValue({ rows: [
        mockVenue
      ]})

      mockedCreatePool.mockReturnValue({
        query: fakeQueryFn
      })

      const result = await getVenues()

      expect(fakeQueryFn).toHaveBeenCalledTimes(1)
      expect(fakeQueryFn).toHaveBeenCalledWith('SELECT * FROM venues ORDER BY venue_id ASC;')
      expect(result).toEqual([mockVenue])
    })
  })

  describe('getVenueById', () => {
    it('returns a venue of given id', async () => {
      const fakeQueryFn: jest.Mock = jest.fn()
      // change this to match database schema
      const mockVenue = {
        id: 1,
        venueName: 'O2 Academy',
      }
      fakeQueryFn.mockReturnValue({ 
        mockVenue
      })

      mockedCreatePool.mockReturnValue({
        query: fakeQueryFn
      })

      const result = await getVenueById(mockVenue.id)

      expect(fakeQueryFn).toHaveBeenCalledTimes(1)
      expect(fakeQueryFn).toHaveBeenCalledWith('SELECT * FROM venues WHERE venue_id = $1;', [1])
      expect(result).toEqual({mockVenue})
    })
  })
})
