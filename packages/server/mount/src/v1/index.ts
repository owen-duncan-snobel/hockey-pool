import express from 'express'
import brackets from './routes/nhlbrackets.route'
import series from './routes/nhlseries.route'

const router = express.Router()

router.use('/NHLBrackets', brackets)
router.use('/NHLSeries', series)

export default router
