import { describe, expect, it } from '@jest/globals'
import { checkKeys, timestampTextRaw, sanitiseStringData, responseToApiGwWithText, responseToApiGw } from './common'

describe('responseToApiGw', () => {
  it('will send the object json-stringified to the xxWithText helper function', () => {
    expect(
      responseToApiGw(200, { message: 'success' }))
      .toEqual(
        {
          'body': '{"message":"success"}',
          'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          'isBase64Encoded': false,
          'statusCode': 200,
        }
      )
  })
})

describe('responseToApiGwWithText', () => {
  it('will return a standard api gw response json', () => {
    expect(
      responseToApiGwWithText(200, 'your-text-here'))
      .toEqual(
        {
          'body': 'your-text-here',
          'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          'isBase64Encoded': false,
          'statusCode': 200,
        }
      )
  })
})

describe('timestampTextRaw', () => {
  it('will print the standard text', () => {
    const aDate = new Date(1234567890)
    expect(timestampTextRaw(aDate)).toEqual('15 Jan 1970, 07:56:07')
  })
})

describe('sanitiseStringData', () => {
  it('will trim input and remove non alpha characters apart from underscore and dash and space', () => {
    expect(sanitiseStringData(' a-;B<->%^c_:[d E ')).toEqual('a-B-c_d E')
  })
})

describe('checkKeys', () => {

  it('will fail if string key missing', () => {
    const keys = ['string1']
    const dataObject = {
      address: 'Leeds'
    }
    expect(checkKeys(keys, dataObject)).toBeFalsy()
  })

  it('will fail if numeric key missing', () => {
    const keys = ['number1']
    const dataObject = {
      address: 'Leeds'
    }
    expect(checkKeys(keys, dataObject)).toBeFalsy()
  })

  it('will validate string keys', () => {
    const keys = ['address']
    const dataObject = {
      address: 'Leeds'
    }
    expect(checkKeys(keys, dataObject)).toBeTruthy()
  })

  it('will validate numeric keys as strings', () => {
    const keys = ['count']
    const dataObject = {
      count: '1'
    }
    expect(checkKeys(keys, dataObject)).toBeTruthy()
  })

  it('numeric keys in strings with falsey values are still valid as they are numeric', () => {
    const keys = ['count']
    const dataObject = {
      count: '0'
    }
    expect(checkKeys(keys, dataObject)).toBeTruthy()
  })

  it('will validate numeric keys', () => {
    const keys = ['count']
    const dataObject = {
      count: 1
    }
    expect(checkKeys(keys, dataObject)).toBeTruthy()
  })

  it('numeric keys with falsey values are still valid as they are numeric', () => {
    const keys = ['count']
    const dataObject = {
      count: 0
    }
    expect(checkKeys(keys, dataObject)).toBeTruthy()
  })
})
