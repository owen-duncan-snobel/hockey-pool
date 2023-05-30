import express from 'express'
import bodyParser from 'body-parser';
import clerk from '../../libs/clerk/clerk'

const router = express.Router()

router.post('/clerk', bodyParser.raw({ type: 'application/json' }), clerk)

export default router
