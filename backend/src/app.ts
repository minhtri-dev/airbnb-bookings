import express from 'express'
import cors from 'cors'

import routes from 'routes'
import { errorHandler } from '@/middlewares/errorHandler'
import { connectDatabase } from '@/services/database/db.service'

const app = express();

(async () => {
  try {
    await connectDatabase()

    app.use(express.json())
    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    )
    app.use('/api', routes)
    app.use(errorHandler)

  } catch (error) {
    console.error('App configuration error:', error)
    process.exit(1)
  }
})()

export default app
