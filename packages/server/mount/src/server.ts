import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import webhooks from './v1/routes/webhooks'
import v1 from './v1'
import ErrorHandler from './v1/middleware/error_handler'
import { errorLogger, logger } from './v1/middleware/logger'
import { createOrUpdateSeries, getSeries, updateSeriesToTeams } from './v1/services/series.service'
import { StatusCodes } from 'http-status-codes'

const PORT = process.env.PORT || 4000

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(logger)

app.use('/api/webhooks', webhooks)
app.use('/api/v1', v1)

// express.json() middleware must go after webhooks (hooks require rawBody)
app.use(express.json())
app.use(errorLogger)
app.use(ErrorHandler)

app.get('/createSeries', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createOrUpdateSeries()
    res.status(StatusCodes.OK).json({
      message: 'Series created / updated',
      status: StatusCodes.OK,
    })
  } catch (err){
    next(err)
  }
})

app.get('/updateSeries', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateSeriesToTeams()
    res.status(StatusCodes.OK).json({
      message: 'Series updated',
      status: StatusCodes.OK,
    })
  } catch (err){
    next(err)
  }
})

app.get('/series', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const series = await getSeries()
    res.status(StatusCodes.OK).json({
      message: 'Series',
      status: StatusCodes.OK,
      data: series,
    })
  } catch(err) {
    next(err)
  }
})

app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: 'OK',
    status: StatusCodes.OK,
  })
})

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`)
})
