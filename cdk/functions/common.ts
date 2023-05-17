import * as lambda from 'aws-lambda'

export type LambdaResult = Promise<lambda.APIGatewayProxyResultV2>
export type LambdaEvent = lambda.APIGatewayProxyEventV2

export const responseToApiGw = (status: number, bodyObject: any): lambda.APIGatewayProxyStructuredResultV2 => {
  // API GW expects a specific structure of response from a Lambda integration
  return responseToApiGwWithText(status, JSON.stringify(bodyObject))
}

export const responseToApiGwWithText = (status: number, bodyText: string): lambda.APIGatewayProxyStructuredResultV2 => {
  // API GW expects a specific structure of response from a Lambda integration
  // See https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/
  return {
    'statusCode': status,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'isBase64Encoded': false,
    'body': bodyText,
  }
}

export const responseToApiGwWithError = (status: number, errorText: string): lambda.APIGatewayProxyStructuredResultV2 => {
  // API GW expects a specific structure of response from a Lambda integration
  return responseToApiGw(status, { error: errorText })
}

export const sanitiseStringData = (text: string) => {
  // Keep only a-z, A-X, and ' ','-','_'
  return text ? text.replace(/[^a-z0-9 _-]/gi, '').trim() : ''
}

const options: Intl.DateTimeFormatOptions =
{
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

export const timestampText = () => {
  return timestampTextRaw(new Date())
}

export const timestampTextRaw = (aDate: Date) => {
  return aDate.toLocaleString('en-GB', options)
}

// We want all specified keys on the object to be a string or a number
export const checkKeys = (keyList: Array<string>, checkObject: {[key: string] : string | number}) => {
  return keyList.every(key =>
    (
      (checkObject[key] && typeof checkObject[key] === 'string'))
    || (!isNaN(Number.parseInt(`${  checkObject[key]}`))
    )
  )
}
