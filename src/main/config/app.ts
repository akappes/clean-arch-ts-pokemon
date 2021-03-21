import 'reflect-metadata'
import 'module-alias/register'
import express from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import { config } from 'dotenv'

config({ path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env' })

const app = express()

setupMiddlewares(app)
setupRoutes(app)

export default app
