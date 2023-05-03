import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import webhooks from './v1/routes/webhooks'

const PORT = process.env.PORT || 4000

const app = express()

// Middleware 
app.use(cors())
app.use(helmet())

app.use('/webhooks', webhooks)

// json middleware must go after webhooks (hooks expect rawBody)
app.use(express.json())

app.get('/', async (req, res) => {
  return res.json({
    works: ''
  })
})

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}`)
})
