// import * as dbHelper from './database-helper';
import { getVenues } from "./database-helper";
import express from "express";
import { Pool } from 'pg'
import { createPool } from "./connection";
// import request from "express";
jest.mock('./connection');
const app = express();
const port = 3000;
const mockedCreatePool = createPool as jest.Mock


const theBaseURL = 'http://localhost:3000/'

// const mockGetVenues = dbHelper.getVenues as jest.Mock
// const mockGetVenuesByID = dbHelper.getVenueById as jest.Mock
// const mockCreateVenue = dbHelper.createVenue as jest.Mock
// const mockUpdateVenue = dbHelper.updateVenue as jest.Mock
// const mockDeleteVenue = dbHelper.deleteVenue as jest.Mock

describe("database-helper tests", () => {
  // test("Get all venues", async () => {
  //   const res = await app.get(theBaseURL);
  //   expect(res.body).toEqual({"info":"Postgres and Express sample"});
  //   // expect(true).toBe(true);
  // });
  describe('getVenues', () => {
    // const poolSpy = jest.spyOn(Pool, "on")
    // poolSpy.mockReturnValue([])
    
    it('returns a list of venues', async () => {
      const fakeQueryFn: any = jest.fn()
      // change this to match database schema
      const mockVenue = {
        venueName: 'O2 Academy',
      }
      fakeQueryFn.mockReturnValue({ rows: [
        mockVenue
      ]});

      mockedCreatePool.mockReturnValue({
        query: fakeQueryFn
      })

      const result = await getVenues();

      expect(fakeQueryFn).toHaveBeenCalledTimes(1);
      expect(fakeQueryFn).toHaveBeenCalledWith('SELECT * FROM venues ORDER BY venue_id ASC;')
      expect(result).toEqual([mockVenue]);
    })
  })
});


// test('should use Math', () => {
//     // Arrange
//     const spyRandom = jest.spyOn(global.Math, 'random')
//     spyRandom.mockReturnValue(0.031)
  
//     // Act + Assert
//     expect(randomUnder100()).toEqual(3)
  
//     expect(spyRandom).toHaveBeenCalled() // i.e. > 0
//     // or
//     expect(spyRandom.mock.calls.length).toBe(1)
//     // or
//     expect(spyRandom).toHaveBeenCalledTimes(1)
//   })


// describe('database-helper tests', () => {


  
//     test('guessColour sets the state', () => {
//       // Arrange
//       const guess = 'black'
//       // Act
//       guessColour(guess)
//       // Assert
//       expect(state.currentGuess).toBe(guess)
//     })
      
//     test('resetGame reverts the state', () => {
//       // Arrange
//       state.deckID = 'deck-id'
//       state.score = 1
//       state.currentGuess = 'you tell me'
//       state.gameOver = true
//       // Act
//       resetGame()
//       // Assert
//       expect(state.deckID).toBe(null)
//       expect(state.score).toBe(0)
//       expect(state.currentGuess).toBe(null)
//       expect(state.gameOver).toBe(false)
//     })
      
//     test('when isCorrectGuess is called it calculates correctly', () => {
//       // Act + Assert
//       expect(isCorrectGuess('red', 'HEARTS')).toBe(true)
//       expect(isCorrectGuess('red', 'DIAMONDS')).toBe(true)
//       expect(isCorrectGuess('black', 'SPADES')).toBe(true)
//       expect(isCorrectGuess('black', 'CLUBS')).toBe(true)
      
//       expect(isCorrectGuess('other', 'HEARTS')).toBe(false)
//       expect(isCorrectGuess('other', 'DIAMONDS')).toBe(false)
//       expect(isCorrectGuess('other', 'SPADES')).toBe(false)
//       expect(isCorrectGuess('other', 'CLUBS')).toBe(false)
      
//       expect(isCorrectGuess('red', 'other')).toBe(false)
//       expect(isCorrectGuess('black', 'other')).toBe(false)
//     })
      
//     // Note you can only use await inside an async block
//     // So have to make the test function async to await on flipCard()
//     test('when flipCard is called with no prior guess it errors', async () => {
//       // Arrange
//       state.currentGuess = null
      
//       // Act
//       try {
//         await flipCard()
//         fail('expected an exception but did not get one')
//       } catch (ex) {
//         // Assert
//         const error = ex as Error
//         expect(error).toBeInstanceOf(Error) 
//         expect(error.name).toStrictEqual('Error')
//         expect(error.message).toStrictEqual('You need to guess before you flip!')
//       }
//     })
      
//     test('when flipCard is called with no prior deck it creates one', async () => {
//       // Arrange
//       state.currentGuess = 'any'
//       state.deckID = null
//       mockShuffleDeck.mockResolvedValue('12345')
//       mockDrawCard.mockResolvedValue({ code: 'ANY', suit: 'ANY'})
          
//       // Act
//       await flipCard()
      
//       // Assert
//       expect(state.deckID).toStrictEqual('12345')
//       expect(mockShuffleDeck.mock.calls.length).toBe(1)
//       expect(mockShuffleDeck.mock.calls[0][0]).toStrictEqual(theBaseURL)
//     })
      
//     test('when flipCard is called it draws a card and checks the guess when cards are left', async () => {
//       // Arrange
//       state.currentGuess = 'black'
//       state.deckID = '12345'
//       state.score = 10
//       state.gameOver = false
//       mockDrawCard.mockResolvedValue({ code: 'B-King', suit: 'SPADES'})
//       mockDrawRemainingCards.mockResolvedValue(1)
          
//       // Act
//       await flipCard()
      
//       // Assert
//       expect(state.deckID).toStrictEqual('12345')
//       expect(mockShuffleDeck.mock.calls.length).toBe(0)
//       expect(mockDrawCard.mock.calls.length).toBe(1)
//       expect(mockDrawCard.mock.calls[0][0]).toStrictEqual(theBaseURL)
//       expect(mockDrawCard.mock.calls[0][1]).toStrictEqual('12345')
//       expect(mockDrawRemainingCards.mock.calls.length).toBe(1)
//       expect(mockDrawRemainingCards.mock.calls[0][0]).toStrictEqual(theBaseURL)
//       expect(mockDrawRemainingCards.mock.calls[0][1]).toStrictEqual('12345')
  
//       expect(state.score).toStrictEqual(11)
//       expect(state.gameOver).toStrictEqual(false)
//     })
      
//     test('when flipCard is called it draws a card and makes a win on the last card', async () => {
//       // Arrange
//       state.currentGuess = 'black'
//       state.deckID = '12345'
//       state.score = 10
//       state.gameOver = false
//       mockDrawCard.mockResolvedValue({ code: 'B-King', suit: 'SPADES'})
//       mockDrawRemainingCards.mockResolvedValue(0)
          
//       // Act
//       await flipCard()
      
//       // Assert
//       expect(state.deckID).toStrictEqual('12345')
//       expect(mockShuffleDeck.mock.calls.length).toBe(0)
//       expect(mockDrawCard.mock.calls.length).toBe(1)
//       expect(mockDrawCard.mock.calls[0][0]).toStrictEqual(theBaseURL)
//       expect(mockDrawCard.mock.calls[0][1]).toStrictEqual('12345')
//       expect(mockDrawRemainingCards.mock.calls.length).toBe(1)
//       expect(mockDrawRemainingCards.mock.calls[0][0]).toStrictEqual(theBaseURL)
//       expect(mockDrawRemainingCards.mock.calls[0][1]).toStrictEqual('12345')
  
//       expect(state.score).toStrictEqual(11)
//       expect(state.gameOver).toStrictEqual(true)
//     })
  
//     test('when flipCard is called it draws a card and ends on a bad guess', async () => {
//       // Arrange
//       state.currentGuess = 'red'
//       state.deckID = '12345'
//       state.score = 10
//       state.gameOver = false
//       mockDrawCard.mockResolvedValue({ code: 'B-King', suit: 'SPADES'})
//       mockDrawRemainingCards.mockResolvedValue(0)
  
//       // Act
//       await flipCard()
  
//       // Assert
//       expect(state.deckID).toStrictEqual('12345')
//       expect(mockShuffleDeck.mock.calls.length).toBe(0)
//       expect(mockDrawCard.mock.calls.length).toBe(1)
//       expect(mockDrawCard.mock.calls[0][0]).toStrictEqual(theBaseURL)
//       expect(mockDrawCard.mock.calls[0][1]).toStrictEqual('12345')
//       expect(mockDrawRemainingCards.mock.calls.length).toBe(0)
  
//       expect(state.score).toStrictEqual(10)
//       expect(state.gameOver).toStrictEqual(true)
//     })
//     })

