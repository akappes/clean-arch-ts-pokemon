import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols.presentation'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }

    const httpResponse: HttpResponse = await controller.handler(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
