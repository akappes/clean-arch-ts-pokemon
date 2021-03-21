import { ServerError } from '../errors'
import { HttpResponse } from '../protocols.presentation'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: { message: 'Unauthorized' }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
