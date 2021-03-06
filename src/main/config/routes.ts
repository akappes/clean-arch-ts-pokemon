import { Express, Router } from 'express'
import { readdirSync } from 'fs'

import { API_VERSION } from './env'

export default (app: Express): void => {
  const router = Router()
  app.use(`/api/${API_VERSION}`, router)
  // eslint-disable-next-line node/no-path-concat
  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.endsWith('.map')) {
      ;(await import(`../routes/${file}`)).default(router)
    }
  })
}
