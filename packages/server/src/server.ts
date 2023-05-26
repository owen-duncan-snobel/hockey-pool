import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import webhooks from './v1/routes/webhooks'
import v1 from './v1'
import ErrorHandler from './v1/middleware/error_handler'
import { errorLogger, logger } from './v1/middleware/logger'
import { addJobs } from './queues/series.queue'

const PORT = process.env.NODE_ENV === 'test' 
  ? 8005 
  : process.env.PORT || 4000

const app: Application = express()

// Middleware
app.use(cors())
app.options('*', cors())
app.use(helmet())
app.use(logger)

app.use('/api/webhooks', webhooks)

// express.json() middleware must go after webhooks (hooks require rawBody)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(clerkClient.expressWithAuth())

app.use('/api/v1', v1)

app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: 'OK',
    status: StatusCodes.OK,
  })
})

app.use(errorLogger)
app.use(ErrorHandler)


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    console.log(`🚀 App listening on port ${PORT}`)
    // initialize queue functions
    await addJobs()
  })
}

export default app