import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import webhooks from './v1/routes/webhooks'
import v1 from './v1'
import ErrorHandler from './v1/middleware/error_handler'
import { errorLogger, logger } from './v1/middleware/logger'

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

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`)
})
