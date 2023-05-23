import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import webhooks from './v1/routes/webhooks'
import v1 from './v1'
import ErrorHandler from './v1/middleware/error_handler'
import { errorLogger, logger } from './v1/middleware/logger'
import { setPicksToActive, updateSeries } from './queues/series.queue'

import { createOrUpdateSeries, syncPlayoffSeriesWithTeams } from './v1/services/nhlseries.service'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { clerkClient } from './libs/clerk/clerk'

const PORT = process.env.PORT || 4000

const app: Application = express()

// // Middleware
app.use(cors())
app.options('*', cors())
app.use(helmet())
app.use(logger)

app.use('/api/webhooks', webhooks)

// express.json() middleware must go after webhooks (hooks require rawBody)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(clerkClient.expressWithAuth())

app.use('/api/v1', v1)

app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: 'OK',
    status: StatusCodes.OK,
  })
})

app.use(errorLogger)
app.use(ErrorHandler)

app.listen(PORT, async () => {
  console.log(`🚀 App listening on port ${PORT}`)
  // initialize queue functions
  updateSeries()
  setPicksToActive()
  // TODO need to check if it is the start of a new round and if so, send out the notification to get the picks in
})
