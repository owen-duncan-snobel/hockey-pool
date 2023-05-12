import express from 'express'
import brackets from './routes/brackets'

const router = express.Router()
router.use('/brackets', brackets)

export default router