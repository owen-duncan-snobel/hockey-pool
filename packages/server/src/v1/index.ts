import express from 'express'
import brackets from './routes/nhlbrackets.route'
import series from './routes/nhlseries.route'
import picks from './routes/nhlpicks.route'

const router = express.Router()

router.use('/NHLBrackets', brackets)
router.use('/NHLSeries', series)
router.use('/NHLPicks', picks)

export default router
