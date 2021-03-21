export interface HttpRequest {
  body?: any
  params?: any
  query?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface Controller {
  handler: (request: HttpRequest) => Promise<HttpResponse>
}
