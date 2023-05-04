import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import webhooks from './v1/routes/webhooks'
import ErrorHandler from './v1/middleware/error_handler'
import { errorLogger, logger } from './v1/middleware/logger'

const PORT = process.env.PORT || 4000

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(logger)

app.use('/webhooks', webhooks)

// express.json() middleware must go after webhooks (hooks require rawBody)
app.use(express.json())
app.use(errorLogger)
app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`)
})
